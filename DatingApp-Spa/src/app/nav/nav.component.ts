import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.Services';
import { AlertifyService } from '../_services/alertify.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authservice: AuthService, private alertify: AlertifyService, private router: Router) {

  }

  
  ngOnInit() {

  }

  login() {
    this.authservice.login(this.model).subscribe(
      next => { this.alertify.success("logged in succesfully") },
      error => { this.alertify.error(error) },
      () => { this.router.navigate(['/members']) }
    );
    

  }

  loggedIn() {
    return this.authservice.loggedIn();
  }

  logOut() { 
    localStorage.removeItem('token');
    this.alertify.message("Logged out");
    this.router.navigate(['/home']);
  }
}
