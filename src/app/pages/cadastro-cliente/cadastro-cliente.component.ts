import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: false,
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent {
  BASE_URL = 'http://localhost:8080/usuarios';
  idBusca: string = '';
  usuarioUnico: any = null;
  clientes: any[] = [];
  today: string = new Date().toLocaleDateString('pt-BR');

  novoCliente = {
    login: '',
    senha: '',
    nome: '',
    cpf: '',
    celular: '',
    data_nascimento: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  };

  constructor(private http: HttpClient) {}

  voltarPagina() {
    window.history.back();
  }

  listarUsuarios() {
    this.http.get<any[]>(this.BASE_URL).subscribe({
      next: res => this.clientes = res,
      error: err => {
        console.error('Erro ao listar usuários', err);
        alert('Erro ao listar usuários');
      }
    });
  }

  buscarPorId() {
    if (!this.idBusca) return;
    this.http.get<any>(`${this.BASE_URL}/${this.idBusca}`).subscribe({
      next: res => {
        this.usuarioUnico = res && Object.keys(res).length > 0 ? res : null;
        if (!this.usuarioUnico) alert('Usuário não encontrado');
      },
      error: err => {
        console.error('Erro ao buscar usuário', err);
        alert('Erro ao buscar usuário');
        this.usuarioUnico = null;
      }
    });
  }

  validarCampos(): boolean {
    const cpfRegex = /^\d{11}$/;
    const celularRegex = /^\d{10,11}$/;
    if (!cpfRegex.test(this.novoCliente.cpf)) {
      alert('CPF inválido. Use apenas números (11 dígitos).');
      return false;
    }
    if (!celularRegex.test(this.novoCliente.celular)) {
      alert('Celular inválido. Use apenas números com DDD.');
      return false;
    }
    return true;
  }

  criarCliente() {
    if (!this.validarCampos()) return;

    const payload = {
      login: this.novoCliente.login,
      senha: this.novoCliente.senha,
      nome: this.novoCliente.nome,
      cpf: this.novoCliente.cpf,
      celular: this.novoCliente.celular,
      data_nascimento: this.novoCliente.data_nascimento,
      endereco: this.novoCliente.endereco,
      cidade: this.novoCliente.cidade,
      estado: this.novoCliente.estado,
      cep: this.novoCliente.cep
    };

    this.http.post(this.BASE_URL, payload).subscribe({
      next: () => {
        alert('Cliente criado com sucesso!');
        this.resetarFormulario();
        this.listarUsuarios();
      },
      error: err => {
        console.error('Erro ao criar cliente', err);
        alert('Erro ao criar cliente');
      }
    });
  }

  resetarFormulario() {
    this.novoCliente = {
      login: '',
      senha: '',
      nome: '',
      cpf: '',
      celular: '',
      data_nascimento: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    };
  }
}
