import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { URL_SERVICE } from '../config/config';
import { Menu } from '../models/menu';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  private urlEndPoint = URL_SERVICE;
  private _menu: Menu;
  private menuObs = new BehaviorSubject<any>([]);
  private menuArreglo = new Array();
  public menuObs$ = this.menuObs.asObservable();

  constructor(private http: HttpClient) {}

  public menuArregloObs():void{
    this.menuArreglo = [];
    if (this._menu != null) {
      this.crearMenu(0);
      this.menuObs.next(this.menuArreglo);
    }else if (this._menu == null && sessionStorage.getItem('menu') != null) {
      this._menu = JSON.parse(sessionStorage.getItem('menu')) as Menu;
      this.crearMenu(0);
      this.menuObs.next(this.menuArreglo);
    }
  }

  public get menu(): Menu{
    if (this._menu != null) {
      return this._menu;
    } else if (this._menu == null && sessionStorage.getItem('menu') != null) {
      this._menu = JSON.parse(sessionStorage.getItem('menu')) as Menu;
      return this._menu;
    }
    return new Menu();
  }

  consultarMenu(idPerfil: number):Observable<Menu>{
    const urlEndpoint = this.urlEndPoint+'/api/usuarios/buscar-menu';
    let params = new URLSearchParams();
    params.set('idPerfil', ""+idPerfil);

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

  crearMenu(idPadreA:number):void{
    if(Object.keys(this._menu).length !== 0){

        for (let i in this._menu) {
          let idMenu:number = this._menu[i]["id"];
          let idPadreB:number = this._menu[i]["idPadre"];
          if (idPadreA === idPadreB) {
            if (idPadreB === 0) {
              this.menuArreglo.push({'id':this._menu[i]["id"],'label':this._menu[i]["nombre"],'link':this._menu[i]["url"],'icon':this._menu[i]["icono"]});

              this.crearMenu(idMenu);

            }else{
              if(this.menuTieneHijos(idMenu) > 0){
                for (let p in this.menuArreglo) {

                  if(this.menuArreglo[p]["id"] == idPadreA){
                    let arregloHijo = {
                      id: this._menu[i]["id"],
                      label: this._menu[i]["nombre"],
                      link: this._menu[i]["url"],
                      icon: this._menu[i]["icono"]
                    }

                    if(this.menuArreglo[p]['items'] !== undefined){
                      this.menuArreglo[p]['items'].push(arregloHijo);
                    }else{
                      this.menuArreglo[p]['items'] = [arregloHijo];
                    }
                  }
                }
                this.crearMenu(idMenu);
              }else{
                for (let p in this.menuArreglo) {
                  if(this.menuArreglo[p]["id"] == idPadreA){
                    let arregloHijo = {
                      id: this._menu[i]["id"],
                      label: this._menu[i]["nombre"],
                      link: this._menu[i]["url"],
                      icon: this._menu[i]["icono"]
                    }

                    if(this.menuArreglo[p]['items'] !== undefined){
                      this.menuArreglo[p]['items'].push(arregloHijo);
                    }else{
                      this.menuArreglo[p]['items'] = [arregloHijo];
                    }
                  }
                }
              }
            }
          }
        }

    }
  }

  menuTieneHijos (idPadreA:number):number {
    let n = 0;
    for (let i in this._menu) {
      let idPadreB:number = this._menu[i]["idPadre"];
      if (idPadreB === idPadreA) {
        n += 1;
      }
    }
    return n;
  }

}
