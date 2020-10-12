import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesEmpresasComponent } from './clientes-empresas.component';

const routes: Routes = [
  {path: '', component: ClientesEmpresasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesEmpresasRoutingModule { }
