import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { FormControl, Validators} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario-service.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../../dialog//alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuServiceService } from '../../../services/menu-service.service';


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

  constructor(private router:Router, private authService: UsuarioService, private dialog: MatDialog,private _snackBar: MatSnackBar, private menuServices: MenuServiceService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {

    if(this.authService.isAuthenticated()){
      this.router.navigate(['/inicio']);
    }
  }

  usuarioFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  login():void{

    if(this.usuario.username === undefined || this.usuario.password === undefined){
      return;
    }

    let titulo:string = "";
    let mensaje:string = "";

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      this.usuario = this.authService.usuario;
      this.consultarMenu(this.usuario);
    }, err => {
      if (err.status == 400) {
        //swal('Error Login', 'Usuario o clave incorrectas!', 'error');
        titulo = "Mensaje del servidor";
        mensaje = "Usuario o password incorrectos!";
        this.openAlertDialog(titulo, mensaje, true);
      }else{
        titulo = "Error del servidor!";
        mensaje = "Ha ocurrido un error inesperado";
        this.openAlertDialog(titulo, mensaje, true);
      }
    }
    );

  }

  consultarMenu(usuario:Usuario):void{
    this.menuServices.consultarMenu(usuario.idPerfil).subscribe(menu => {
      let mensaje = "Bienvenido "+usuario.nombre+" "+usuario.apellido;
      this.openSnackBar(mensaje);
      this.menuServices.guardarMenu(menu);
      this.router.navigate(['/inicio']);
      /*let usuario = this.authService.usuario;*/
    }, error => {
      if(error.status == 400){
        this.authService.logout();
        this.openAlertDialog("Error del servidor!", "Error desconocido", true);
        //swal('Error Login', 'Usuario o clave incorrecta', 'error');
      }

      if(error.status == 404){
        this.authService.logout();
        this.openAlertDialog("Error del servidor!", "Servicio no encontrado!", true);
        //swal('Error Login', 'Usuario o clave incorrecta', 'error');
      }
    }
    );
  }

  openAlertDialog(titulo:string, mensaje:string, error:boolean) {
    this.dialog.open(AlertDialogComponent,{
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
      panelClass: ['success-snackbar'],
      verticalPosition: 'top'
    });
  }


}
