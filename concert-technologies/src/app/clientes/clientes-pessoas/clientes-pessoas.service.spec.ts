import { TestBed } from '@angular/core/testing';

import { ClientesPessoasService } from './clientes-pessoas.service';

describe('ClientesPessoasService', () => {
  let service: ClientesPessoasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesPessoasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
