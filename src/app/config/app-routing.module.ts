import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/usuario/login/login.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { AuthGuard } from '../components/usuario/guards/auth.guard';

const routes: Routes = [
  { path: 'login/:over', component: LoginComponent,data: {animation: 'LoginPage'} },
  { path: 'inicio', component: InicioComponent,data: {animation: 'inicioPage'}, canActivate:[AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'login/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
