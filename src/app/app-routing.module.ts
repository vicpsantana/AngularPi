import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaVetComponent } from './pages/area-vet/area-vet.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AtendimentoComponent } from './pages/atendimento/atendimento.component';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CadastroAtendimentoComponent } from './pages/cadastro-atendimento/cadastro-atendimento.component';
import { PetsComponent } from './pages/pets/pets.component';
import { CadastroPetsComponent } from './pages/cadastro-pets/cadastro-pets.component';


const routes: Routes = [
  { path: '', redirectTo: 'area-vet', pathMatch: 'full' }, // Rota padrão
  { path: 'area-vet', component: AreaVetComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'atendimentos', component: AtendimentoComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'cadastro-atendimento', component: CadastroAtendimentoComponent },
  { path: 'pets', component: PetsComponent},
  { path: 'cadastro-pets', component: CadastroPetsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
