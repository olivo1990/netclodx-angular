//Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './config/material-module';
import { AppRoutingModule } from './config/app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Servicios Providers
import { UsuarioService } from './services/usuario-service.service'

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AlertDialogComponent
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
    NgbModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialogComponent],
})
export class AppModule { }
