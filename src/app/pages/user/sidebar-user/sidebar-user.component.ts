import { Component, OnInit } from '@angular/core';
import {ManufacturerService} from "../../../services/manufacturer.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

  manufacturers: any;
  constructor(private _manufacturer: ManufacturerService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._manufacturer.getManufacturers().subscribe({
      next: (data: any)=> {
        this.manufacturers =data
      },
      error: (error)=>{
        this._snack.open('Error loading database','',{
          duration: 3000
        })
        console.log(error)
      }
    })
  }

}
