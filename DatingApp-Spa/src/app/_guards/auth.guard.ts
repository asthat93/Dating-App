import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.Services';
import { AlertifyService } from '../_services/alertify.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authservice: AuthService, private alertify: AlertifyService, private router: Router) {

  }
  canActivate(): boolean{
    if (this.authservice.loggedIn())
      return true;
    else
      this.alertify.error("You shall not pass!!!!");
    this.router.navigate(['/home']);
  }
  
}
