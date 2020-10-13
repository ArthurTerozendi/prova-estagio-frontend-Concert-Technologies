import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesEmpresasModule } from './clientes-empresas/clientes-empresas.module';
import { ClientesPessoasModule } from './clientes-pessoas/clientes-pessoas.module';
import { ClientesComponent } from './clientes.component';

const routes: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'pessoas', loadChildren: () => import('./clientes-pessoas/clientes-pessoas.module').then(m =>ClientesPessoasModule)},
  {path: 'empresas', loadChildren: () => import('./clientes-empresas/clientes-empresas.module').then(m => ClientesEmpresasModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
