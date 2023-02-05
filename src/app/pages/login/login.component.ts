import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }
  constructor(private snack: MatSnackBar, private _login: LoginService, private _router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required !!", '', {
        duration: 3000
      })
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required !!", '', {
        duration: 3000
      })
      return;
    }

    this._login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log("success");
        console.log(data)
        //login...
        this._login.loginUser(data.token);
        let timerInterval: string | number | NodeJS.Timer | undefined
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
            this._login.getCurrentUser().subscribe({
              next: (user: any) => {
                this._login.setUser(user);
                console.log(user)
                //admin: admin dashboard
                //normal: normal dashboard
                if (this._login.getUserRole() == 'Admin') {
                  this._router.navigate(['admin']);
                  this._login.loginStatusSubject.next(true);
                } else if (this._login.getUserRole() == 'Client') {
                  this._router.navigate(['client-dashboard']);
                  this._login.loginStatusSubject.next(true);
                } else {
                  this._login.logOut();
                }
              }
            })
          }
        })

      },
      error: (error) => {
        console.log("error");
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000
        })
      },

      complete: () => {
        console.log("the end")
      }
    })
  }

}
