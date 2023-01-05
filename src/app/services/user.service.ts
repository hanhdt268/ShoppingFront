import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = environment.apiBaseUrl
  constructor(private _http: HttpClient) { }

   //update user
  public updateUser(user: any): Observable<any> {
    return this._http.put(`${this.apiBaseUrl}/user/update`, user)
  }

  //add user
  public addUser(user: any): Observable<any> {
    return this._http.post(`${this.apiBaseUrl}/user/`, user)
  }
}
