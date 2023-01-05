import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    fullName: '',
    email: '',
    address: '',
    phone: '',

  }
  constructor(private userService: UserService, private _snack: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
  }
  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this._snack.open('User is required !!', '', {
        duration: 3000
      });
      return;
    }
    
    Swal.fire({
      title: 'Successfully',
      icon: "success",
      timer: 1000,
      // didOpen: () => {
      //   // @ts-ignore
      //   Swal.showLoading()
      //   // @ts-ignore
      //   const b = Swal.getHtmlContainer().querySelector('b')
      //   timerInterval = setInterval(() => {
      //     // @ts-ignore
      //     b.textContent = Swal.getTimerLeft()
      //   }, 100)
      // },
      // willClose: () => {
      //   clearInterval(timerInterval)
      // }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.userService.addUser(this.user).subscribe({
          next: (data: any) => {
            this._router.navigate(['login'])
          },
          error: (error: any) => {
            this._snack.open('user already exists !!', '', {
              duration: 3000
            });
    
          },
          complete: () => console.log("the end")
        })
        
      }
    })
  }
}
