import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

import { Pessoa } from './pessoa';
import { delay, take } from 'rxjs/operators'

@Injectable()
export class ClientesPessoasService {

  private readonly API = "http://localhost:3000/pessoas";

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
    return this.http.post(this.API, form).pipe(take(1));
  }

  update(pessoa) {
    return this.http.put(`${this.API}/${pessoa.id}`, pessoa).pipe(take(1));
  }

  deletar(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
