//Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './config/material-module';
import { AppRoutingModule } from './config/app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

//Servicios Providers
import { UsuarioService } from './services/usuario-service.service';
import { TokenInterceptor } from './services/interceptors/token.interceptor';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { GestorUsuarioComponent } from './components/usuario/gestor-usuario/gestor-usuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalComponent } from './components/empleado/personal.component';
import { FormComponent } from './components/empleado/form/form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertDialogComponent,
    FooterComponent,
    InicioComponent,
    GestorUsuarioComponent,
    MenuComponent,
    ProfileComponent,
    PersonalComponent,
    FormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NgbModule,
    NgMaterialMultilevelMenuModule
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AlertDialogComponent
  ],
  providers: [UsuarioService,
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class AppModule { }
