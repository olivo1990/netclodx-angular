import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../../dialog//alert-dialog/alert-dialog.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { PoliticasPassword } from '../../../config/politicas-password';
import { PoliticasPasswordModelo } from '../../../models/politicasPasswordModelo';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  titulo:string = "Crear cuenta";
  usuario:Usuario;
  hide:boolean = true;
  hideV:boolean = true;
  verificarPasswordValue:string;
  errores: string[];
  validarError:boolean = false;
  validarPassword:boolean = false;
  mensajeErrorPassword:string;
  politicasPassword:PoliticasPassword;
  politicasPasswordModelo:PoliticasPasswordModelo[];


  constructor(private _snackBar: MatSnackBar,private router: Router,
    private activatedRoute: ActivatedRoute,private usuarioService:UsuarioService, private dialog: MatDialog) {
    this.usuario = new Usuario();
    this.politicasPassword = new PoliticasPassword();
    this.politicasPasswordModelo = this.politicasPassword.politicasPassword();

    console.log(this.politicasPasswordModelo);
  }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nombreFormControl = new FormControl('', [
    Validators.required
  ]);

  apellidoFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  verificarPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  registrar():void{

    let titulo:string = "Error del servidor";
    let mensaje:string = "Ocurrió un error inesperado!";

    this.validarPassword = false;

    if(this.verificarPasswordValue !== this.usuario.password){
      console.log("ingresó");
      /*let message = "Los passwords no coinciden";
      this.openSnackBar(message);*/
      this.validarPassword = true;
      this.mensajeErrorPassword = "Los passwords no coinciden";
      return;
    }

    if(this.nombreFormControl.hasError('required') || this.apellidoFormControl.hasError('required') || this.passwordFormControl.hasError('required') || this.verificarPasswordFormControl.hasError('required') || this.emailFormControl.hasError('required') || (this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required'))){
      return;
    }

    this.usuarioService.registrar(this.usuario)
      .subscribe(
        usuario => {
          this.usuario = usuario;
          this.router.navigate(['/login/0']);
          titulo = "Muy bien!";
          mensaje = "Al parecer ya eres uno de los nuestros";
          this.openAlertDialog(titulo, mensaje, false);
          //swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          this.router.navigate(['/login/0']);
          titulo = "Error del servidor";
          mensaje = "Ocurrió un error inesperado!";
          this.openAlertDialog(titulo, mensaje, true);

          //console.error(err.error.errors);
        }
    );

  }

  openAlertDialog(titulo:string, mensaje:string, error:boolean) {
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      width: '300px',
      data:{
        title: titulo,
        message: mensaje,
        error: error,
        buttonText: {
          cancel: 'Cerrar'
        }
      },
    });
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 5 * 1000,
      panelClass: ['warning-snackbar']
    });
  }

}
