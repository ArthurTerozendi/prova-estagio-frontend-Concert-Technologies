import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesPessoasRoutingModule } from './clientes-pessoas-routing.module';
import { ClientesPessoasComponent } from './clientes-pessoas.component';


@NgModule({
  declarations: [
    ClientesPessoasComponent
  ],
  imports: [
    CommonModule,
    ClientesPessoasRoutingModule
  ]
})
export class ClientesPessoasModule { }
