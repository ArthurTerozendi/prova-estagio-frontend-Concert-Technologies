import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  loading : boolean = false;

  erroLogin : boolean = false;

  form : FormGroup;
  constructor(
    private loginService : LoginService,
    private formBuilder : FormBuilder
  ) {
  }
  
  ngOnInit(): void {
    //Timer para a execução do Spinner Loading
    setTimeout(() => this.loading = true , 1200);
    //instancia os campos dos formulários
    this.form = this.formBuilder.group({
      login: [null],
      senha: [null]
    });
  }

  /* 
  * Pega as informações dos campos e envia para o método fazer login do LoginService
  */
  efetuarLogin() {
    console.log(this.form.value);
    this.loginService.fazerLogin(this.form.value);
    //variavel que salva se há ou não, erro no login
    this.erroLogin = !this.loginService.conferirEstadoLogin();
  }

}
