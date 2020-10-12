import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesPessoasComponent } from './clientes-pessoas.component';

const routes: Routes = [
  {path: '', component: ClientesPessoasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesPessoasRoutingModule { }
