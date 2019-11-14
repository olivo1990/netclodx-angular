import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import { Menu } from '../../models/menu';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private menu: Menu;
  public menuArreglo = new Array();
  public menu$:Observable<Menu>;  

  appitems = [];

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#f4f9fb',
    fontColor: '#484848',
    backgroundColor: '#f4f9fb',
    selectedListFontColor: '#484848',
  };

  constructor(private router: Router,private menuService: MenuServiceService,private _changeDetector: ChangeDetectorRef) {
    this.menu = new Menu();
    this.menuArreglo = [];
  }

  ngOnInit() {
    this.cargarMenu();
  }

  cargarMenu():void{
    setTimeout(()=>{
      this._changeDetector.detectChanges();
      this.menuArreglo = [];
      this.menu = this.menuService.menu;  
      this.crearMenu(0);
      if(this.menuArreglo === undefined){  
        this.menuArreglo = this.appitems; 
      }
    }, 500);
  }

  crearMenu(idPadreA:number):void{
    if(Object.keys(this.menu).length !== 0){

        for (let i in this.menu) {
          let idMenu:number = this.menu[i]["id"];
          let idPadreB:number = this.menu[i]["idPadre"];
          if (idPadreA === idPadreB) {
            if (idPadreB === 0) {
              this.menuArreglo.push({'id':this.menu[i]["id"],'label':this.menu[i]["nombre"],'link':this.menu[i]["url"],'icon':this.menu[i]["icono"]});
             
              this.crearMenu(idMenu);
              
            }else{
              if(this.menuTieneHijos(idMenu) > 0){
                for (let p in this.menuArreglo) {

                  if(this.menuArreglo[p]["id"] == idPadreA){
                    let arregloHijo = {
                      id: this.menu[i]["id"],
                      label: this.menu[i]["nombre"],
                      link: this.menu[i]["url"],
                      icon: this.menu[i]["icono"]
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
                      id: this.menu[i]["id"],
                      label: this.menu[i]["nombre"],
                      link: this.menu[i]["url"],
                      icon: this.menu[i]["icono"]
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
    for (let i in this.menu) {
      let idPadreB:number = this.menu[i]["idPadre"];
      if (idPadreB === idPadreA) {
        n += 1;
      }
    }
    return n;
  }

  selectedItem(event):void{
    this.router.navigate([event.link]);
  }

}
