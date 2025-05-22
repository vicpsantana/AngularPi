import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: false,
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent {
  BASE_URL = '/cadastro';
  idBusca: string = '';
  usuarioUnico: any = null;
  clientes: any[] = [];
  today: string = new Date().toLocaleDateString('pt-BR');

  novoCliente = {
    a_login: '',
    b_senha: '',
    c_nome: '',
    d_cpf: '',
    e_celular: '',
    f_data_nascimento: '',
    g_endereco: '',
    h_cidade: '',
    i_estado: '',
    j_cep: ''
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
    if (!cpfRegex.test(this.novoCliente.d_cpf)) {
      alert('CPF inválido. Use apenas números (11 dígitos).');
      return false;
    }
    if (!celularRegex.test(this.novoCliente.e_celular)) {
      alert('Celular inválido. Use apenas números com DDD.');
      return false;
    }
    return true;
  }

  criarCliente() {
    if (!this.validarCampos()) return;

    const payload = {
      login: this.novoCliente.a_login,
      senha: this.novoCliente.b_senha,
      nome: this.novoCliente.c_nome,
      cpf: this.novoCliente.d_cpf,
      celular: this.novoCliente.e_celular,
      data_nascimento: this.novoCliente.f_data_nascimento,
      endereco: this.novoCliente.g_endereco,
      cidade: this.novoCliente.h_cidade,
      estado: this.novoCliente.i_estado,
      cep: this.novoCliente.j_cep
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
      a_login: '',
      b_senha: '',
      c_nome: '',
      d_cpf: '',
      e_celular: '',
      f_data_nascimento: '',
      g_endereco: '',
      h_cidade: '',
      i_estado: '',
      j_cep: ''
    };
  }
}
