import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes-empresas-form',
  templateUrl: './clientes-empresas-form.component.html',
  styleUrls: ['./clientes-empresas-form.component.sass']
})
export class ClientesEmpresasFormComponent implements OnInit {
  carregado : boolean = false;
  
  form : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
  
    this.form = this.formBuilder.group({
    id: [null],
    nome: [null, Validators.required],
    cnpj : [null, Validators.required],
    telefone: [null],
    cep: [null, Validators.required],
    rua: [null, Validators.required],
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
    estado: [null, Validators.required],
    });

  }

  onSubmit(){
    console.log(this.form.value);
  }

}
