import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo:string = "Iniciar sesión";
  usuario:Usuario;
  validarUsuario:boolean = false;
  mensajeErrorUser:string;
  validarPassword:boolean = false;
  mensajeErrorPass:string;
  hide:boolean = true;
  crearCuenta:boolean = false;
  ocultarOverlay:boolean = false;

  constructor(private router:Router, private route:ActivatedRoute) {
    this.usuario = new Usuario();
    //setTimeout(function(){ this.ocultarOverlay = true; }, 3000);

    setTimeout(()=>{
      this.ocultarOverlay = true;
    }, 2000);
  }

  ngOnInit() {
    this.route.params.subscribe( params =>{
      if(params["over"] == 0){
        this.ocultarOverlay = true;
      }
    });
  }

  login():void{

    console.log("hola");

  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();


}
