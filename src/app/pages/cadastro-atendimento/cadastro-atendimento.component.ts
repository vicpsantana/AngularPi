import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // 👈 IMPORTAÇÃO

@Component({
  selector: 'app-cadastro-atendimento',
  standalone: false,
  templateUrl: './cadastro-atendimento.component.html',
  styleUrl: './cadastro-atendimento.component.css'
})
export class CadastroAtendimentoComponent implements OnInit {
  atendimentoForm!: FormGroup;
  usuarios: any[] = [];
  animalId!: string | null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location // 👈 INJETADO AQUI
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('animalId');
    this.atendimentoForm = this.fb.group({
      id_animal: [this.animalId || '', Validators.required],
      id_usuario: ['', Validators.required],
      descricao: ['', Validators.required],
      atendimento_horas: ['', Validators.required],
      hora_agendada: ['', Validators.required],
      data_agendada: ['', Validators.required],
      preco: ['', Validators.required],
    });

    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.http.get<any[]>('http://localhost:2025/cadastrousuarios')
      .subscribe({
        next: data => this.usuarios = data,
        error: err => console.error('Erro ao buscar usuários:', err)
      });
  }

  onSubmit(): void {
    if (this.atendimentoForm.invalid) {
      this.atendimentoForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.atendimentoForm.value,
      id_animal: Number(this.atendimentoForm.value.id_animal),
      id_usuario: Number(this.atendimentoForm.value.id_usuario),
      atendimento_horas: Number(this.atendimentoForm.value.atendimento_horas),
      preco: parseFloat(this.atendimentoForm.value.preco)
    };

    this.http.post('http://localhost:2025/cadastroAtendimento', payload).subscribe({
      next: () => {
        alert('Atendimento cadastrado com sucesso!');
        this.atendimentoForm.reset({ id_animal: this.animalId || '' });
      },
      error: err => {
        console.error(err.error || err.message);
        alert('Erro ao cadastrar atendimento.');
      }
    });
  }

  voltar(): void {
    this.location.back(); // 👈 VOLTA PARA A PÁGINA ANTERIOR
  }
}
