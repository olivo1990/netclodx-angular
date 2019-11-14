import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
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
  public isLogin:boolean;
  ocultarOverlay:boolean;
  constructor(private router: Router,private authService: UsuarioService, private ngZone:NgZone) {

      let re1 = '-';
      let re2 = '_';
      let re3 = '.';

      router.events.subscribe( (event: Event) => {

        if (event instanceof NavigationStart) {
          
            // Show loading indicator
            this.ocultarOverlay = false;
        }

        if (event instanceof NavigationEnd) {
            // Hide loading indicator
            this.ocultarOverlay = true;
            
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
              
              if(window.innerWidth <= 832){
                this.sidenav.close();
              }else{
                this.sidenav.open();
              }

              window.onresize = (e) =>
              {
                  //ngZone.run will help to run change detection
                  this.ngZone.run(() => {
                      if(window.innerWidth <= 832){
                        this.sidenav.close();
                      }else{
                        this.sidenav.open();
                      }
                  });
              };

            }else{
              this.sidenav.close();
            }
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
