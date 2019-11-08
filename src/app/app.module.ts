//Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './config/material-module';
import { AppRoutingModule } from './config/app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from 'angular-admin-lte';    //Loading layout module
import { BoxModule } from 'angular-admin-lte';       //Box component

//Servicios Providers
import { UsuarioService } from './services/usuario-service.service'

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertDialogComponent,
    FooterComponent,
    InicioComponent,
    HeaderComponent,
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
    LayoutModule,
    BoxModule
  ],
  providers: [UsuarioService],
  bootstrap: [
    AppComponent,
    HeaderComponent
  ],
  entryComponents: [
    AlertDialogComponent,
    HeaderComponent
  ],
})
export class AppModule { }
