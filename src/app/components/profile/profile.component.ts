import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private usuario:Usuario;
  public nombreUsuario:string;
  public iconoExpand:boolean;
  public nombreEmpresa:string = "Movilbox S.A.S";

  constructor(private authService: UsuarioService,private router: Router) {
    this.usuario = new Usuario();
    this.usuario = this.authService.usuario;
    this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;

    console.log(this.iconoExpand);

  }

  ngOnInit() {
    setTimeout(()=>{
      this.usuario = this.authService.usuario;
      this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;
    },500)
  }

  cerrarSesion():void{
    this.authService.logout();
    this.router.navigate(["/login/1"]);
  }

}
