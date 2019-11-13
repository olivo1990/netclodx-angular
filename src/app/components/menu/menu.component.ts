import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Menu;
  menuArreglo: Menu[];

  appitems = [
    {
      label: 'Item 2',
      icon: 'alarm',
      items: [
        {
          label: 'Item 2.1',
          link: '/item-2-1',
          icon: 'favorite'
        },
        {
          label: 'Item 2.2',
          link: '/item-2-2',
          icon: 'favorite_border'
        }
      ]
    },
    {
      label: 'Item 3',
      link: '/item-3',
      icon: 'offline_pin'
    },
    {
      label: 'Item 4',
      link: '/item-4',
      icon: 'star_rate',
      hidden: true
    }
  ];

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#f4f9fb',
    fontColor: '#484848',
    backgroundColor: '#f4f9fb',
    selectedListFontColor: 'red',
  };

  constructor(private menuService: MenuServiceService) {
    this.menu = new Menu();
  }

  ngOnInit() {
    this.menu = this.menuService.menu;
    this.crearMenu(0);
    if(this.menuArreglo === undefined){
      this.menuArreglo = [
        {
          id: 1,
          nombre: "Prueba",
          url: "#",
          estado: true,
          icono: "supervisor_account",
          idPadre: 0,
          hijos: [
            {
              id: 1,
              nombre: "Prueba",
              url: "#",
              estado: true,
              icono: "supervisor_account",
              idPadre: 0,
              hijos: []
            }
          ]
        }
      ]
    }
  }


  crearMenu(idPadreA:number):void{
    if(Object.keys(this.menu).length === 0){
      for (let i in this.menu) {
        let idMenu:number = this.menu[i]["id"];
        let idPadreB:number = this.menu[i]["idPadre"];
        if (idPadreA === idPadreB) {
          if (idPadreB === 0) {
            this.menuArreglo = [this.menu[i]];
            if(this.menuTieneHijos(idMenu) > 0){
              this.crearMenu(idMenu);
            }
          }else{
            for (let p in this.menuArreglo) {
              if(this.menuArreglo[p]["id"] === idPadreA){
                this.menuArreglo[p]['hijos'] = this.menu[i];
              }
            }
            if(this.menuTieneHijos(idMenu) > 0){
              this.crearMenu(idMenu);
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

  selectedItem(e):void{
    console.log(e);
  }

}
