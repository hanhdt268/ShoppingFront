import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  constructor(public _login: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this._login.isLoggedIn();
    this.user = this._login.getUser();
    this._login.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn = this._login.isLoggedIn();
      this.user = this._login.getUser();
    })
  }
  logout() {
    this._login.logOut();

    window.location.reload();
  }
}
