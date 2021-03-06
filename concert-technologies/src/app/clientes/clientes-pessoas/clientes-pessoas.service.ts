import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

import { Pessoa } from './pessoa';
import { delay, take } from 'rxjs/operators'

@Injectable()
export class ClientesPessoasService {

  //rota para o JSON-Server das pessoas
  private readonly API = "http://localhost:3000/pessoas";

  constructor(
    private http : HttpClient
  ) { }

  /**
   * Método que buscará no JSON-server o objeto que tem o id igual ao passado por parámetro
   * @param id 
   */
  carregarComId(id){
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  /**
   * Listará todos os dados que estão dentro do JSON-server
   */
  listar() {
    return this.http.get<Pessoa[]>(this.API).pipe(
      //pequeno delay para mostrar o Spinner Loading
      delay(1000)
    );
  }
  /**
   * Método responsável por cadastrar os novos dados passados por parámetro
   * @param form 
   */
  adcionar(form) {
    return this.http.post(this.API, form).pipe(take(1));
  }

  /**
   * Irá atualizar as informações de um cadastro ja existente
   * @param pessoa 
   */
  update(pessoa) {
    return this.http.put(`${this.API}/${pessoa.id}`, pessoa).pipe(take(1));
  }

  /**
   * Exclui o cadastro com o Id igual ao id passado por parametro
   * @param id 
   */
  deletar(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
