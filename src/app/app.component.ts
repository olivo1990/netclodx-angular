import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './config/route-animation';
import { Observable } from 'rxjs';
import { UsuarioService } from './services/usuario-service.service';
import { MenuServiceService } from './services/menu-service.service';
import { Usuario } from './models/usuario';
import { Menu } from './models/menu';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'project-angular';
  public path: string;
  public isLoggedIn$: Observable<boolean>;
  public nombreUsuario:string;
  private usuario:Usuario;
  private menu: Menu;
  public menuArreglo: any[];
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private authService: UsuarioService, private router: Router, private menuService: MenuServiceService) {
    this.usuario = new Usuario();
    this.menu = new Menu();
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.usuario = this.authService.usuario;
    this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;
    this.menu = this.menuService.menu;
    this.path = window.location.pathname;
    let re1 = '-';
    let re2 = '_';
    let re3 = '.';
    let re4 = '/';
    this.path = this.path.replace(re1, " ");
    this.path = this.path.replace(re2, " ");
    this.path = this.path.replace(re3, " ");
    this.path = this.path.replace(re4, "");
    this.crearMenu(0);
    console.log(this.menuArreglo);
  }

  crearMenu(idPadreA:number):void{
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

  cerrarSesion():void{
    this.authService.logout();
    this.router.navigate(["/login/1"]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
