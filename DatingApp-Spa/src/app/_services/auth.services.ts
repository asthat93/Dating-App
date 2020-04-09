import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: 'http://localhost:5000/api/auth/';
  constructor(private http: HttpClient) {

  }

  //pipe is used to manipulate the response based on bussiness logi ,
  //here we get observable return type so we use the map keyword to map it our response

  login(model: any) {
    return this.http.post('http://localhost:5000/api/auth/'+ 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }

        })
      );
  }

  register(model: any) {
    return this.http.post('http://localhost:5000/api/auth/' + 'register', model);
  }
}
