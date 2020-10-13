import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Empresas } from './clientes-empresas/empresas';
import { delay, take } from 'rxjs/operators'

@Injectable()
export class ClientesService {

  private API = `${environment.API}empresas`

  constructor(
    private http : HttpClient
  ) { }


  carregarComId(id){
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  listar() {
    return this.http.get<Empresas[]>(this.API).pipe(
      delay(1000)
    );
  }

  adcionar(form) { 
    return this.http.post(this.API, form).pipe(take(1));
  }

  update(empresa) {
    return this.http.put(`${this.API}/${empresa.id}`, empresa).pipe(take(1));
  }

  deletar(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
