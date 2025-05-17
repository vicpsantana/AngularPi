import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CadastroClienteComponent } from './cadastro-cliente.component';

describe('CadastroClienteComponent', () => {
  let component: CadastroClienteComponent;
  let fixture: ComponentFixture<CadastroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroClienteComponent],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar CPF corretamente', () => {
    component.novoCliente.d_cpf = '12345678901';
    component.novoCliente.e_celular = '11999999999';
    expect(component.validarCampos()).toBeTrue();
  });

  it('deve falhar com CPF inválido', () => {
    component.novoCliente.d_cpf = '123';
    component.novoCliente.e_celular = '11999999999';
    expect(component.validarCampos()).toBeFalse();
  });

  it('deve falhar com celular inválido', () => {
    component.novoCliente.d_cpf = '12345678901';
    component.novoCliente.e_celular = 'abc';
    expect(component.validarCampos()).toBeFalse();
  });
});
