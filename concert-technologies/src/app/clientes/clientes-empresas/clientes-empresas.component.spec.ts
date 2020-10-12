import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesEmpresasComponent } from './clientes-empresas.component';

describe('ClientesEmpresasComponent', () => {
  let component: ClientesEmpresasComponent;
  let fixture: ComponentFixture<ClientesEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
