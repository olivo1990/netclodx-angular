import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './config/route-animation';
import { MatSidenav } from '@angular/material/sidenav';
import { UsuarioService } from './services/usuario-service.service';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  title = 'project-angular';
  public path: string;
  private usuario:Usuario;
  public nombreUsuario:string;
  public isLogin:boolean;
  constructor(private router: Router,private authService: UsuarioService) {

      let re1 = '-';
      let re2 = '_';
      let re3 = '.';

      router.events.subscribe( (event: Event) => {

        if (event instanceof NavigationStart) {
            // Show loading indicator
        }

        if (event instanceof NavigationEnd) {
            // Hide loading indicator
            this.isLogin = false;
            this.path = event.url;
            this.path = this.path.replace(re1, " ");
            this.path = this.path.replace(re2, " ");
            this.path = this.path.replace(re3, " ");
            let pathArray = this.path.split("/");
            this.path = "";
            for (let i in pathArray) {
                if(isNaN(Number(pathArray[i]))){
                  if(parseInt(i) > 1){
                    this.path +="/";
                  }
                  this.path += pathArray[i];
                }
            }

            this.usuario = this.authService.usuario;

            if(this.usuario.perfiles.length > 0 && Object.keys(this.usuario).length > 0){
              this.isLogin = true;
              this.sidenav.open();
            }else{
              this.sidenav.close();
            }

            this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;
        }
    });

  }

  ngOnInit() {

  }

  cerrarSesion():void{
    this.isLogin = true;
    this.authService.logout();
    this.router.navigate(["/login/1"]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
