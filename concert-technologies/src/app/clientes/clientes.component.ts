import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.sass']
})
export class ClientesComponent implements OnInit {

  carregado : boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
  }

}
