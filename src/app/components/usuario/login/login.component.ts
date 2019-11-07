import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from '../../../services/usuario-service.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../../dialog//alert-dialog/alert-dialog.component';


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

  constructor(private router:Router, private route:ActivatedRoute, private authService: UsuarioService, private dialog: MatDialog) {
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

    let titulo:string = "Error del servidor";
    let mensaje:string = "Ocurrió un error inesperado!";

    console.log("hola");

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      /*this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');*/
      
      titulo = "Muy bien!";
      mensaje = "Es un honor que puedas ingresar!";
      this.openAlertDialog(titulo, mensaje, false);
      this.router.navigate(['/inicio']);

    }, err => {
      if (err.status == 400) {
        //swal('Error Login', 'Usuario o clave incorrectas!', 'error');
        titulo = "Mensaje del servidor";
        mensaje = "Usuario o password incorrectos!";
        this.openAlertDialog(titulo, mensaje, true);
      }else{
        titulo = "Error del servidor!";
        mensaje = "Ha ocurrido un error inesperado!";
        this.openAlertDialog(titulo, mensaje, true);
      }
    }
    );

  }

  usuarioFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

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


}
