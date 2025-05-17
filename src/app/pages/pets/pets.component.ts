import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  standalone: false,
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent implements OnInit {
  animais: any[] = [];
  filteredAnimais: any[] = [];
  searchId: string = '';
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchAnimais();
  }

  fetchAnimais(): void {
    this.http.get<any[]>('http://localhost:2025/cadastroAnimal').subscribe({
      next: (data) => {
        this.animais = data;
        this.filteredAnimais = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar animais', err);
        this.error = 'Erro ao carregar os dados.';
        this.loading = false;
      }
    });
  }

  handleSearch(): void {
    this.filteredAnimais = this.animais.filter(animal =>
      animal.id_novoAnimal.toString().includes(this.searchId)
    );
  }

  handleClear(): void {
    this.searchId = '';
    this.filteredAnimais = [...this.animais];
  }

  handleCreateNew(): void {
    this.router.navigate(['/cadastropet']);
  }

  handleEdit(id: number): void {
    this.router.navigate(['/cadastropet'], { queryParams: { id } });
  }

  handleGoBack(): void {
    this.router.navigate(['/dashboard']);
  }

  handleDelete(id: number): void {
    this.http.delete(`http://localhost:2025/cadastroAnimal/${id}`).subscribe({
      next: () => {
        this.animais = this.animais.filter(a => a.id_novoAnimal !== id);
        this.filteredAnimais = this.filteredAnimais.filter(a => a.id_novoAnimal !== id);
      },
      error: (err) => {
        console.error('Erro ao excluir animal', err);
        this.error = 'Erro ao excluir o animal.';
      }
    });
  }
}
