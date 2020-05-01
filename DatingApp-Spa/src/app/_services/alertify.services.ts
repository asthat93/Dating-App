import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  
  //e is event of the function which is ued for callback 
  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      }
      else {
      }
    });
  }

  success(message: string) {
    alertify.success(message) 
  }

  warning(message: string) {
    alertify.warning(message)
  }

  error(message: string) {
    alertify.error(message)
  }

  message(message: string) {
    alertify.message(message)
  }

}
