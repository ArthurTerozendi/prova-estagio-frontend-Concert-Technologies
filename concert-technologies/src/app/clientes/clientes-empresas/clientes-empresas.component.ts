import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ClientesService } from '../clientes.service';
import { Empresas } from './empresas';

@Component({
  selector: 'app-clientes-empresas',
  templateUrl: './clientes-empresas.component.html',
  styleUrls: ['./clientes-empresas.component.sass'],
  preserveWhitespaces: true
})
export class ClientesEmpresasComponent implements OnInit {

  empresas$ : Observable<Empresas[]>;
  
  carregado : boolean = false;
  
  constructor(
    private clientesService : ClientesService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);

    this.empresas$ = this.clientesService.listar();

  }

}
