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
  private urlEndPoint = URL_SERVICE + '/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {
  }


  /*registrar(usuario: Usuario): Usuario {

    this.usuario = usuario;

    return this.usuario;
  }*/

  registrar(usuario: Usuario): Observable<Usuario> {

    return this.http.post(`${this.urlEndPoint}/registrar`, usuario, { })
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

}
