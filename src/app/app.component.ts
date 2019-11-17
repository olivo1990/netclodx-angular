import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
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
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  public title = 'project-angular';
  public path: string;
  public isLogin:boolean;
  public ocultarOverlay:boolean;
  public mobileQuery: MediaQueryList;
  public mobileQueryComponentlogin: MediaQueryList;
  private usuario:Usuario;
  private _mobileQueryListener: () => void;
  constructor(private router: Router,private authService: UsuarioService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

      this.mobileQueryComponentlogin = media.matchMedia('(max-width: 480px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQueryComponentlogin.addListener(this._mobileQueryListener);

      let re1 = '-';
      let re2 = '_';
      let re3 = '.';
      let re4 = '-';

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
            this.path = this.path.replace(re4, " ");
            let pathArray = this.path.split("/");
            this.path = "";
            for (let i in pathArray) {
                if(isNaN(Number(pathArray[i]))){
                  if(parseInt(i) > 1){
                    this.path +=" > ";
                  }
                  this.path += pathArray[i];
                }
            }

            this.usuario = this.authService.usuario;

            if(Object.keys(this.usuario).length > 0){
                this.isLogin = true;

              if(this.mobileQuery.matches)
                this.sidenav.close();
            }else{
              this.isLogin = false;
              this.sidenav.close();
            }

            console.log(this.isLogin);
        }
    });

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
