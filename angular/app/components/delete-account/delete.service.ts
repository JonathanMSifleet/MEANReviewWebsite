import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserModel from '../../../../models/userModel';

@Injectable({ providedIn: 'root' })
export class DeleteService {

  constructor(private http: HttpClient) {}

  deleteAccount(username, token): Observable<object> {
    console.log('delete service component username', username);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers,
      params: {username}
    };

    const user = UserModel.findOne({username });
    console.log('user:', user);
    // const userId = user.id;

    return this.http
      .delete(`http://127.0.0.1:3000/auth/:${user}`, httpOptions);
  }

}
