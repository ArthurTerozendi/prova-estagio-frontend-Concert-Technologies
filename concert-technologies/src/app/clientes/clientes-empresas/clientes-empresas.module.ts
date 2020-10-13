import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesEmpresasRoutingModule } from './clientes-empresas-routing.module';
import { ClientesEmpresasComponent } from './clientes-empresas.component';
import { ClientesEmpresasService } from './clientes-empresas.service';


@NgModule({
  declarations: [
    ClientesEmpresasComponent
  ],
  imports: [
    CommonModule,
    ClientesEmpresasRoutingModule
  ], 
  providers: [ClientesEmpresasService]
})
export class ClientesEmpresasModule { }
