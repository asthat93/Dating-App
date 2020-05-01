import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './_services/auth.Services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  jwtHelperService = new JwtHelperService();
 
  constructor(private authservice: AuthService){  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token!=null) {
      this.authservice.decodedToken = this.jwtHelperService.decodeToken(token);
    }
  }

}
