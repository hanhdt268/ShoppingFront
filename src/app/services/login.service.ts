import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiBaseUrl = environment.apiBaseUrl
  public loginStatusSubject= new Subject<boolean>();
  constructor(private _http: HttpClient) { }
  public getCurrentUser(): Observable<any>{
    return this._http.get(`${this.apiBaseUrl}/current-user`);
  }


  //generate token
  public generateToken(loginDate: any):Observable<any>{
    return  this._http.post(`${this.apiBaseUrl}/generate-token`, loginDate);
  }

  //login user: set token in localStorage
  public loginUser(token: any){
    localStorage.setItem('token', token);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr ==null){
      return false;
    }else {
      return true;
    }
  }

  //logout: remove token from local storage
  public logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //getToken
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser(){
    let userStr = localStorage.getItem('user');
    if (userStr != null){
      return JSON.parse(userStr);
    }else {
      this.logOut();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
