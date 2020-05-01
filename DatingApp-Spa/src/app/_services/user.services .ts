import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../environments/environment'
import { observable, Observable } from 'rxjs';
import { User} from '../_models/user'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: 'http://localhost:5000/api/';//enviorment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/api/user/');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>('http://localhost:5000/api/user/'+id);
  }
 }





