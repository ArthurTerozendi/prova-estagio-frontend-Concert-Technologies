import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesPessoasFormRoutingModule } from './clientes-pessoas-form-routing.module';
import { ClientesPessoasFormComponent } from './clientes-pessoas-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientesPessoasFormComponent],
  imports: [
    CommonModule,
    ClientesPessoasFormRoutingModule,
    FormsModule
  ]
})
export class ClientesPessoasFormModule { }
