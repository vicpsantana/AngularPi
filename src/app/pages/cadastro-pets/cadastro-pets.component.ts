import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // ✅ Import necessário

@Component({
  selector: 'app-cadastro-pets',
  standalone: false,
  templateUrl: './cadastro-pets.component.html',
  styleUrl: './cadastro-pets.component.css'
})
export class CadastroPetsComponent implements OnInit {
  petForm!: FormGroup;
  usuarios: any[] = [];
  usuarioValido: boolean = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private location: Location // ✅ Injeção do serviço Location
  ) {}

  ngOnInit(): void {
    this.petForm = this.fb.group({
      id_usuario: ['', Validators.required],
      nome: ['', Validators.required],
      deficiencias: [''],
      intolerancias: [''],
      data_nascimento: [''],
      sexo: ['', Validators.required]
    });

    this.http.get<any[]>('http://localhost:2025/usuarios').subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Erro ao carregar usuários', err)
    });
  }

  verificarUsuario(id: number): void {
    this.http.get(`http://localhost:2025/cadastro/${id}`).subscribe({
      next: (res) => this.usuarioValido = !!res,
      error: () => this.usuarioValido = false
    });
  }

  onIdUsuarioChange(): void {
    const id = this.petForm.value.id_usuario;
    if (id) this.verificarUsuario(id);
  }

  onSubmit(): void {
    if (!this.usuarioValido) {
      alert('Erro: usuário não cadastrado!');
      return;
    }

    this.http.post('http://localhost:2025/cadastroAnimal', this.petForm.value).subscribe({
      next: () => {
        alert('Animal cadastrado com sucesso!');
        this.petForm.reset();
        this.usuarioValido = true;
      },
      error: (err) => {
        console.error('Erro ao cadastrar animal', err);
        alert('Erro ao cadastrar o animal.');
      }
    });
  }

  // ✅ Novo método para voltar à página anterior
  voltarPagina(): void {
    this.location.back();
  }
}
