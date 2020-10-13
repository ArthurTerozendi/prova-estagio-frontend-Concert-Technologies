import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empresas } from './clientes-empresas/empresas';

import { delay } from 'rxjs/operators'

@Injectable()
export class ClientesService {

  private API = `${environment.API}empresas`

  constructor(
    private http : HttpClient
  ) { }

  listar() {
    return this.http.get<Empresas[]>(this.API).pipe(
      delay(1000)
    );
  }
}
