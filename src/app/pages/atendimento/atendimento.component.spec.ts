import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {
  atendimentos: any[] = [];
  filteredAtendimentos: any[] = [];
  searchId: string = '';
  error: string | null = null;
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchAtendimentos();
  }

  fetchAtendimentos() {
    this.http.get<any[]>('http://localhost:2025/cadastroatendimento')
      .subscribe({
        next: (data) => {
          this.atendimentos = data;
          this.filteredAtendimentos = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
          this.error = 'Erro ao carregar atendimentos';
          this.loading = false;
        }
      });
  }

  handleSearch() {
    this.filteredAtendimentos = this.atendimentos.filter(a =>
      a.id.toString().includes(this.searchId)
    );
  }

  handleClear() {
    this.searchId = '';
    this.filteredAtendimentos = [...this.atendimentos];
  }

  handleDelete(id: number) {
    this.http.delete(`http://localhost:2025/cadastroatendimento/${id}`)
      .subscribe({
        next: () => {
          this.atendimentos = this.atendimentos.filter(a => a.id !== id);
          this.filteredAtendimentos = this.filteredAtendimentos.filter(a => a.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir atendimento:', err);
          this.error = 'Não foi possível excluir o atendimento';
        }
      });
  }

  handleEdit(id: number) {
    this.router.navigate([`/editaratendimento`, id]);
  }

  handleCreateNew() {
    this.router.navigate(['/cadastroSERVICOVET']);
  }

  handleGoBack() {
    this.router.navigate(['/dashboard']);
  }
}
