import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../_services/alertify.services';
import { UserService } from '../../_services/user.services ';
import { User } from '../../_models/user';
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent  {
  constructor(private http: HttpClient,
    private alertify: AlertifyService, private userservice: UserService) { }
  
  
}
