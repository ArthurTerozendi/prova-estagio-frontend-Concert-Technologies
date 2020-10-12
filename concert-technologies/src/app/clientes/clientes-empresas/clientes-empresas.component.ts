import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-empresas',
  templateUrl: './clientes-empresas.component.html',
  styleUrls: ['./clientes-empresas.component.sass']
})
export class ClientesEmpresasComponent implements OnInit {

  carregado : boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
  }

}
