import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Estados } from './estados';
import { Cidades } from './cidades';
import { map } from 'rxjs/operators';
import { Paises } from './clientes-pessoas/paises';

@Injectable()
export class ClientesDropdownService {

  constructor(
    private http : HttpClient
    ) { }

  getEstados() {
    return this.http.get<Estados[]>('/assets/dados/estados.json');
  }

  
  getCidades(idEstado : number) {
    return this.http.get<Cidades[]>('/assets/dados/cidades.json').pipe(
      map((cidades : Cidades[]) => cidades.filter(c => c.estado == idEstado))
    );
  }
  getPaises() {
    return this.http.get<Paises[]>('/assets/dados/paises.json');
  }

  getPaisesNome(sigla) {
    return this.http.get('/assets/dados/paises.json').pipe(
      map((pais : Paises[]) => pais.filter(p => p.sigla == sigla))
    );
  }
}