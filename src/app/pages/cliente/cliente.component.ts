 import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  animais: any[] = [];
  filteredAnimais: any[] = [];
  searchId: string = '';
  loading: boolean = true;
  error: string | null = null;
  filterMessage: string = '';
  deleteMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any[]>('http://localhost:8080/usuarios').subscribe({
      next: (data) => {
        this.animais = data;
        this.filteredAnimais = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  handleSearch(): void {
    this.filteredAnimais = this.animais.filter(animal =>
      animal.Id.toString().includes(this.searchId)
    );
    this.filterMessage = `Resultados filtrados para ID: ${this.searchId}`;
  }

  handleClearFilter(): void {
    this.searchId = '';
    this.filteredAnimais = this.animais;
    this.filterMessage = '';
  }

  handleDelete(id: number): void {
    this.http.delete(`http://localhost:8080/usuarios/${id}`).subscribe({
      next: () => {
        this.animais = this.animais.filter(animal => animal.Id !== id);
        this.filteredAnimais = this.animais;
        this.deleteMessage = 'Cadastro excluído com sucesso!';
      },
      error: (err) => {
        console.error('Erro ao excluir cadastro:', err);
        this.error = 'Não foi possível excluir o cadastro';
      }
    });
  }

  handleCreateNew(): void {
    this.router.navigate(['/cadastrocliente']);
  }

  handleGoBack(): void {
    this.router.navigate(['/dashboard']);
  }

  handleEdit(animal: any): void {
    this.router.navigate(['/cadastrocliente'], { state: { animal } });
  }
}
