import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/usuario/login/login.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { AuthGuard } from '../components/usuario/guards/auth.guard';
import { GestorUsuarioComponent } from '../components/usuario/gestor-usuario/gestor-usuario.component';
import { PersonalComponent } from '../components/empleado/personal.component';
import { FormComponent } from '../components/empleado/form/form.component';

const routes: Routes = [
  { path: 'login/:over', component: LoginComponent,data: {animation: 'LoginPage'} },
  { path: 'inicio', component: InicioComponent,data: {animation: 'inicioPage'}, canActivate:[AuthGuard]},
  { path: 'gestor-usuario', component: GestorUsuarioComponent, canActivate:[AuthGuard]},
  { path: 'gestor-empleado', component: PersonalComponent,data: {animation: 'gestorEmpleadoPage'}, canActivate:[AuthGuard]},
  { path: 'gestor-empleado/form-empleado', component: FormComponent,data: {animation: 'formEmpleadoPage'}, canActivate:[AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
