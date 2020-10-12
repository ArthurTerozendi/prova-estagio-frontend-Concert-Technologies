import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-pessoas',
  templateUrl: './clientes-pessoas.component.html',
  styleUrls: ['./clientes-pessoas.component.sass']
})
export class ClientesPessoasComponent implements OnInit {

  carregado : boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
  }
}
