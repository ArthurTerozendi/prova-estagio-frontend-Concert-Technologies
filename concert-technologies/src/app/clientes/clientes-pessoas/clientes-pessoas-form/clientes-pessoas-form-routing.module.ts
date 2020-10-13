import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesPessoasFormComponent } from './clientes-pessoas-form.component';

const routes: Routes = [
  {path: '', component: ClientesPessoasFormComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesPessoasFormRoutingModule { }
