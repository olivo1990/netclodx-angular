import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from '../../../services/usuario-service.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../../dialog//alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuServiceService } from '../../../services/menu-service.service';


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

  constructor(private router:Router, private route:ActivatedRoute, private authService: UsuarioService, private dialog: MatDialog,private _snackBar: MatSnackBar, private menuServices: MenuServiceService) {
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

    if(this.authService.isAuthenticated()){
      this.router.navigate(['/inicio']);
    }
  }

  usuarioFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  login():void{

    let titulo:string = "";
    let mensaje:string = "";

    this.authService.login(this.usuario).subscribe(response => {

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      this.usuario = this.authService.usuario;


      titulo = "Muy bien!";
      mensaje = "Bienvenido "+this.usuario.nombre+" "+this.usuario.apellido;
      //this.openAlertDialog(titulo, mensaje, false);
      this.consultarMenu(this.usuario.id);
      this.openSnackBar(mensaje);
      this.router.navigate(['/inicio']);

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

  consultarMenu(idUsuario: number):void{
    this.menuServices.consultarMenu(idUsuario).subscribe(menu => {
      this.menuServices.guardarMenu(menu);
      /*let usuario = this.authService.usuario;*/
    }, error => {
      if(error.status == 400){
        this.openAlertDialog("Error del servidor!", "Error desconocido", true);
        //swal('Error Login', 'Usuario o clave incorrecta', 'error');
      }

      if(error.status == 404){
        this.openAlertDialog("Error del servidor!", "Servicio no encontrado!", true);
        //swal('Error Login', 'Usuario o clave incorrecta', 'error');
      }
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
      panelClass: ['success-snackbar'],
      verticalPosition: 'top'
    });
  }


}
