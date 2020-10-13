import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClientesDropdownService } from './clientes-dropdown.service';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ClientesComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [
    ClientesDropdownService
  ]
})
export class ClientesModule { }
