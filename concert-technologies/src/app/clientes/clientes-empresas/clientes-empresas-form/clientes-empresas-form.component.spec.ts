import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesEmpresasFormComponent } from './clientes-empresas-form.component';

describe('ClientesEmpresasFormComponent', () => {
  let component: ClientesEmpresasFormComponent;
  let fixture: ComponentFixture<ClientesEmpresasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesEmpresasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesEmpresasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
