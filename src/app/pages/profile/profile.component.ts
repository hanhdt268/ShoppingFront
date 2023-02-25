import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProfileComponent} from "../update-profile/update-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  constructor(private _loginService: LoginService, private _dialog:MatDialog) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  openDialog() {
    const profile = this._dialog.open(UpdateProfileComponent,{width:"60%",height:"500px"})
    profile.afterClosed().subscribe(r =>{
      this.loadProfile();
    })
  }

  loadProfile(){
    this.user = this._loginService.getUser();
  }
}
