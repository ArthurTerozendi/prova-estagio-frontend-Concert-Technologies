import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesEmpresasRoutingModule } from './clientes-empresas-routing.module';
import { ClientesEmpresasComponent } from './clientes-empresas.component';


@NgModule({
  declarations: [
    ClientesEmpresasComponent
  ],
  imports: [
    CommonModule,
    ClientesEmpresasRoutingModule
  ]
})
export class ClientesEmpresasModule { }
