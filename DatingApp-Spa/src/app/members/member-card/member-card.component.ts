import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../_services/alertify.services';
import { UserService } from '../../_services/user.services ';
import { User } from '../../_models/user';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent  {
  constructor(private http: HttpClient,
    private alertify: AlertifyService, private userservice: UserService) { }
  @Input() user: User;
  
}
