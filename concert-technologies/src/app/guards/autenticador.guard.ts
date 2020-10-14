import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class AutenticadorGuard implements CanActivate{

  constructor(
    private loginService : LoginService,
    private router : Router
  ) { }

  canActivate () : Observable<boolean> | boolean{
    return this.verificarAcesso();
  }
  /**
   * Método que irá verificar se o usuario está logado ou não
   * se estiver ele permitirá o usuario a continuar navegando
   * se não, ele o encaminhará para a página de login
   */
  private verificarAcesso(){
    if (this.loginService.conferirEstadoLogin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;  
  }
}