import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesPessoasRoutingModule } from './clientes-pessoas-routing.module';
import { ClientesPessoasComponent } from './clientes-pessoas.component';
import { ClientesPessoasService } from './clientes-pessoas.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClientesPessoasComponent
  ],
  imports: [
    CommonModule,
    ClientesPessoasRoutingModule,
    SharedModule
  ],
  providers: [ClientesPessoasService]
})
export class ClientesPessoasModule { }
