import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesModule } from './clientes/clientes.module';
import { AutenticadorGuard } from './guards/autenticador.guard';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  {path: 'clientes', loadChildren: () => import('src/app/clientes/clientes.module').then(m => ClientesModule)},
  {path: 'login', loadChildren: () => import('src/app/login/login.module').then(m => LoginModule)},
  {path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => HomeModule)}, //canActivate: [AutenticadorGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
