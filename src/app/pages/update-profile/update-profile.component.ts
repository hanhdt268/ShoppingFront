import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";
import Swal from "sweetalert2";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  id: any;
  user: any;

  constructor(private _route: Router,private dialog: MatDialog,
               private _login: LoginService, private _user: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.params.Id;
    this.user = this._login.getUser();
  }
  updateUser() {
    this._user.updateUser(this.user).subscribe({
      next: (data: any) => {
        Swal.fire('Successfully', "Profile updated", 'success')
        this._login.setUser(data);
        this.closeDialog();
        this._route.navigate(['/admin/profile']);
      },
      error: (error) => {
        Swal.fire('Error', "Profile updated", 'error')
        console.log(error)
      }
    })
    console.log(this.user)
  }

  closeDialog(){
    this.dialog.closeAll();
  }


}
