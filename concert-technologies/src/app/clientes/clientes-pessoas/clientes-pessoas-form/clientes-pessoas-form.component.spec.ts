import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPessoasFormComponent } from './clientes-pessoas-form.component';

describe('ClientesPessoasFormComponent', () => {
  let component: ClientesPessoasFormComponent;
  let fixture: ComponentFixture<ClientesPessoasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesPessoasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesPessoasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
