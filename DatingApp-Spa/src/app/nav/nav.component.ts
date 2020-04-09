import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.Services';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authservice:AuthService) {

  }


  ngOnInit() {

  }

  login() {
    this.authservice.login(this.model).subscribe(
      next => { console.log("logged in succesfully") },
      error => { console.log(error) }
    );

  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token != null)
      return true

    return false;
  }

  loggeOut() {
     localStorage.removeItem('token'); 
  }
}
