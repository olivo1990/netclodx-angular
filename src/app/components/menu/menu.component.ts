import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import { Menu } from '../../models/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private menu: Menu;

  appitems = [];

  config = {
    paddingAtStart: true,
    classname: 'menu-content',
    listBackgroundColor: '#1f4457',
    fontColor: '#9ed3ef',
    backgroundColor: '#1f4457',
    selectedListFontColor: '#9ed3ef',
  };

  constructor(private router: Router,private menuService: MenuServiceService) {
  }

  ngOnInit() {
    this.cargarMenu();
  }

  cargarMenu():void{
    this.menuService.menuArregloObs();
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

  selectedItem(event:any):void{
    this.router.navigate([event.link]);
  }

}
