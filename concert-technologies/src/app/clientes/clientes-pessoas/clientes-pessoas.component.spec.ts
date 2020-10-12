import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPessoasComponent } from './clientes-pessoas.component';

describe('ClientesPessoasComponent', () => {
  let component: ClientesPessoasComponent;
  let fixture: ComponentFixture<ClientesPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesPessoasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
