import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesEmpresasFormModule } from './clientes-empresas-form/clientes-empresas-form.module';
import { ClientesEmpresasComponent } from './clientes-empresas.component';

const routes: Routes = [
  {path: '', component: ClientesEmpresasComponent, children: [
    {path: 'novo', loadChildren: () => import('./clientes-empresas-form/clientes-empresas-form.module').then(m => ClientesEmpresasFormModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesEmpresasRoutingModule { }
