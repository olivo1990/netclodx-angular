import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../config/config';

@Injectable()
export class UsuarioService {

  private urlEndPoint = URL_SERVICE;
  private _usuario: Usuario;
  private _token: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
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
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.id = payload.id;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.correo = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.perfiles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.usuario.perfiles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('menu');
    this.loggedIn.next(false);
  }

}
