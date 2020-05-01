import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.Services';
import { AlertifyService } from '../_services/alertify.services'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authservice: AuthService, private alertify: AlertifyService) {

  }

  

  ngOnInit() {
    
  }

  register() {
    this.authservice.register(this.model).subscribe(() => console.log('registration succesfull'),
      error => this.alertify.error(error));
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.error('cancelled');
  }

  
}
