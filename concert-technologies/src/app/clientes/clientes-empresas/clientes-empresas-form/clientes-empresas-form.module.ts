import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesEmpresasFormRoutingModule } from './clientes-empresas-form-routing.module';
import { ClientesEmpresasFormComponent } from './clientes-empresas-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientesEmpresasFormComponent],
  imports: [
    CommonModule,
    ClientesEmpresasFormRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ClientesEmpresasFormModule { }
