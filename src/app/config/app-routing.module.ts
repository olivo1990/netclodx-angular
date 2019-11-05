import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/usuario/login/login.component';
import { RegistroComponent } from '../components/usuario/registro/registro.component';


const routes: Routes = [
  { path: 'login/:over', component: LoginComponent,data: {animation: 'LoginPage'} },
  { path: 'registrar', component: RegistroComponent,data: {animation: 'RegistroPage'} },
  { path: '**', pathMatch: 'full', redirectTo: 'login/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
