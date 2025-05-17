import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaVetComponent } from './pages/area-vet/area-vet.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AtendimentoComponent } from './pages/atendimento/atendimento.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CadastroAtendimentoComponent } from './pages/cadastro-atendimento/cadastro-atendimento.component';
import { PetsComponent } from './pages/pets/pets.component';
import { CadastroPetsComponent } from './pages/cadastro-pets/cadastro-pets.component';


@NgModule({
  declarations: [
    AppComponent,
    AreaVetComponent,
    DashboardComponent,
    AtendimentoComponent,
    CadastroClienteComponent,
    ClienteComponent,
    CadastroAtendimentoComponent,
    PetsComponent,
    CadastroPetsComponent,

  ],
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
