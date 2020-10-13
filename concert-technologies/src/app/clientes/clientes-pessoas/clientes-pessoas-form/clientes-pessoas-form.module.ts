import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesPessoasFormRoutingModule } from './clientes-pessoas-form-routing.module';
import { ClientesPessoasFormComponent } from './clientes-pessoas-form.component';


@NgModule({
  declarations: [ClientesPessoasFormComponent],
  imports: [
    CommonModule,
    ClientesPessoasFormRoutingModule
  ]
})
export class ClientesPessoasFormModule { }
