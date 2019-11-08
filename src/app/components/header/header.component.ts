import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario-service.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean>;
  usuario:Usuario;
  nombreUsuario:string;

  constructor(private authService: UsuarioService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.usuario = this.authService.usuario;
    this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;
  }

  cerrarSesion():void{
    this.authService.logout();
    this.router.navigate(["/login/1"]);
  }

}
