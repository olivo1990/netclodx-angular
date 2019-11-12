import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: UsuarioService) { 
    this.usuario = new Usuario()
  }

  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;
  }

}
