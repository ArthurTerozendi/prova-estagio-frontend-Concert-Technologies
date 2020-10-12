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

  fazerLogin(usuario) {
    if(usuario.login == 'concert' && usuario.senha == 'prova'){
      this.logado = true;
      console.log('logado com sucesso')
      this.router.navigate(['../']);
    } else {
      this.logado = false;
      console.log('Não conseguiu logar')
    }
  }

  conferirEstadoLogin() {
    return this.logado;
  }
}
