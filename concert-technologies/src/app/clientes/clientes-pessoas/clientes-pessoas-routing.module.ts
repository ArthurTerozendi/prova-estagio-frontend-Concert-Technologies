import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesPessoasFormModule } from './clientes-pessoas-form/clientes-pessoas-form.module';
import { ClientesPessoasComponent } from './clientes-pessoas.component';

const routes: Routes = [
  {path: '', component: ClientesPessoasComponent},
  {path: 'cadastrar', loadChildren: () => import('./clientes-pessoas-form/clientes-pessoas-form.module').then(m => ClientesPessoasFormModule)},
  {path: 'editar/:id', loadChildren: () => import('./clientes-pessoas-form/clientes-pessoas-form.module').then(m => ClientesPessoasFormModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesPessoasRoutingModule { }
