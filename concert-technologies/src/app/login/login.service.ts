import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logado : boolean = false;

  constructor(
    private router : Router
  ) { }

  /**
   * Método responsável pra ver se a senha e o login são corretos
   * Se sim, o estados logado vai ser true, e o usuario vai poder acessar as paginas restantes
   * Se não, o estados vai continuar false, e ele não poderá acessar as outras páginas
   */
  fazerLogin(usuario) {
    if(usuario.login == 'concert' && usuario.senha == 'prova'){
      this.logado = true;
      this.router.navigate(['../']);
    } else {
      this.logado = false;
    }
  }

  /**
   * Método para verificar o estados logado. 
   */
  conferirEstadoLogin() {
    return this.logado;
  }
}
