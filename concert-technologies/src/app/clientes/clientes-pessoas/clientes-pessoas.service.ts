import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

import { environment } from 'src/environments/environment';
import { Pessoa } from './pessoa';
import { delay, take } from 'rxjs/operators'

@Injectable()
export class ClientesPessoasService {

  private API = `${environment.API}pessoas`

  constructor(
    private http : HttpClient
  ) { }


  carregarComId(id){
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  listar() {
    return this.http.get<Pessoa[]>(this.API).pipe(
      delay(1000)
    );
  }

  adcionar(form) { 
    console.log('oi');
    return this.http.post(this.API, form).pipe(take(1));
  }

  update(empresa) {
    return this.http.put(`${this.API}/${empresa.id}`, empresa).pipe(take(1));
  }

  deletar(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
