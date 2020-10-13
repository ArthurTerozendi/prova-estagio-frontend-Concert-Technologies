import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesEmpresasFormComponent } from './clientes-empresas-form.component';

const routes: Routes = [
  {path: '', component: ClientesEmpresasFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesEmpresasFormRoutingModule { }
