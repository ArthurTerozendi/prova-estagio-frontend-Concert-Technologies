import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Estados } from './estados';
import { Cidades } from './cidades';
import { map } from 'rxjs/operators';

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

  teste(){
    console.log('Chegou aqui');
  }
}