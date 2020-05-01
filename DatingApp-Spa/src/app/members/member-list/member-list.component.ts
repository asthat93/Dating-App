import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../_services/alertify.services';
import { UserService } from '../../_services/user.services ';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-memberlist',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  constructor(private http: HttpClient,
    private alertify: AlertifyService, private userservice: UserService, private route: ActivatedRoute) { }
  users: User[];
  
  ngOnInit(): void {
    this.route.data.subscribe(data => { this.users = data['users'] });
    }
  
  //loadUsers() {
  //  this.userservice.getUsers().subscribe(
  //    (users: User[]) => { this.users = users; }
  //    , error => { this.alertify.error(error) });
  //}


}
