import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

import { Empresas } from './empresas';
import { delay, take } from 'rxjs/operators'

@Injectable()
export class ClientesEmpresasService {

  //Rota para o JSON-server das empresas
  private readonly API = "http://localhost:3000/empresas"

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
    return this.http.get<Empresas[]>(this.API).pipe(
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
  update(empresa) {
    return this.http.put(`${this.API}/${empresa.id}`, empresa).pipe(take(1));
  }

  /**
   * Exclui o cadastro com o Id igual ao id passado por parametro
   * @param id 
   */
  deletar(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
