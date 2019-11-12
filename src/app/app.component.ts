import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { slideInAnimation } from './config/route-animation';
import { Observable } from 'rxjs';
import { UsuarioService } from './services/usuario-service.service';
import { Usuario } from './models/usuario';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'project-angular';
  public path: string;
  private usuario:Usuario;
  public isLoggedIn$: Observable<boolean>;
  public nombreUsuario:string;
  public isLogin:boolean = false;
  constructor(private router: Router,private authService: UsuarioService) {

    if(!this.authService.isAuthenticated()){
      this.isLogin = true;
      console.log(this.isLogin);
    }

    let re1 = '-';
    let re2 = '_';
    let re3 = '.';
    let re4 = '/';

    router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          this.path = event.url;
          this.path = this.path.replace(re1, " ");
          this.path = this.path.replace(re2, " ");
          this.path = this.path.replace(re3, " ");
          this.path = this.path.replace(re4, "");
      
          console.log(this.path);
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });
    
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.usuario = this.authService.usuario;
    this.nombreUsuario = this.usuario.nombre+" "+this.usuario.apellido;

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
