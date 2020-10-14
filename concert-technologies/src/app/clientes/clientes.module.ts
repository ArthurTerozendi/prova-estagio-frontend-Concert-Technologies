import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesDropdownService } from './clientes-dropdown.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  providers: [
    ClientesDropdownService
  ]
})
export class ClientesModule { }
