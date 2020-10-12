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

  form : FormGroup;
  constructor(
    private loginService : LoginService,
    private formBuilder : FormBuilder
  ) {
  }
  
  ngOnInit(): void {
    setTimeout(() => this.loading = true , 1500);
    
    this.form = this.formBuilder.group({
      login: [null],
      senha: [null]
    });

    console.log(this.form);
  }

  efetuarLogin() {
    console.log(this.form.value);
    this.loginService.fazerLogin(this.form.value);
  }

}
