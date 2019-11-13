import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
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

  constructor(private authService: UsuarioService,private router: Router,) {
    this.usuario = new Usuario();
    this.usuario = this.authService.usuario;
    this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;

    this.router.events.subscribe( (event: Event) => {
        if (event instanceof NavigationStart) {
            // Show loading indicator
        }

        if (event instanceof NavigationEnd) {
            this.usuario = this.authService.usuario;
            this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;
        }
    });
  }

  ngOnInit() {

  }

  cerrarSesion():void{
    this.authService.logout();
    this.router.navigate(["/login/1"]);
  }

}
