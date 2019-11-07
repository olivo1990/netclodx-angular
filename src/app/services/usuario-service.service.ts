import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../config/config';


@Injectable()
export class UsuarioService {

  private usuario:Usuario;
  private urlEndPoint = URL_SERVICE;

  constructor(private http: HttpClient, private router: Router) {
  }


  /*registrar(usuario: Usuario): Usuario {

    this.usuario = usuario;

    return this.usuario;
  }*/

  registrar(usuario: Usuario): Observable<Usuario> {

    return this.http.post(`${this.urlEndPoint}/api/usuarios/registrar`, usuario, { })
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError(e => {

          console.log(e.status);

          if (e.status == 400) {
            return throwError(e);
          }

          if(e.error.mensaje){
            console.log(e.error.mensaje);
          }
          return throwError(e);
        })
      );
   }

   login(usuario: Usuario): Observable<any> {
    const urlEndpoint = this.urlEndPoint+'/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

}
