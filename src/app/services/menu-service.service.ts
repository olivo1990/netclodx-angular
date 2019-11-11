import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICE } from '../config/config';
import { Menu } from '../models/menu';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  private urlEndPoint = URL_SERVICE;
  private _menu: Menu;

  constructor(private http: HttpClient) {}

  public get menu(): Menu{
    if (this._menu != null) {
      return this._menu;
    } else if (this._menu == null && sessionStorage.getItem('menu') != null) {
      this._menu = JSON.parse(sessionStorage.getItem('menu')) as Menu;
      return this._menu;
    }
    return new Menu();
  }

  consultarMenu(idUsuario: number):Observable<Menu>{
    const urlEndpoint = this.urlEndPoint+'/api/usuarios/buscar-menu';
    let params = new URLSearchParams();
    params.set('idUsuario', ""+idUsuario);

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Menu>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarMenu(menu: Menu):void{
    this._menu = new Menu();
    this._menu = menu;
    sessionStorage.setItem('menu', JSON.stringify(this._menu));
  }

}
