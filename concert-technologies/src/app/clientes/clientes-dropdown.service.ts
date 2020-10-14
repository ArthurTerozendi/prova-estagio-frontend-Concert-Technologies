import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Estados } from './clientes-empresas/estados';
import { Cidades } from './clientes-empresas/cidades';
import { map } from 'rxjs/operators';
import { Paises } from './clientes-pessoas/paises';

@Injectable()
export class ClientesDropdownService {

  constructor(
    private http : HttpClient
    ) { }
  
  /**
   * Pega todas as informações do estados.json
   */
  getEstados() {
    return this.http.get<Estados[]>('/assets/dados/estados.json');
  }

  /**
   * Pega todas as cidades do cidades.json, cuja o estado é igual ao IdEstado passado por parâmetro
   * @param idEstado 
   */
  getCidades(idEstado : number) {
    return this.http.get<Cidades[]>('/assets/dados/cidades.json').pipe(
      map((cidades : Cidades[]) => cidades.filter(c => c.estado == idEstado))
    );
  }
  /**
   * Pega todos os paises do paises.json
   */
  getPaises() {
    return this.http.get<Paises[]>('/assets/dados/paises.json');
  }
}