import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

  category: any;
  constructor(private _category: CategoriesService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe({
      next: (data: any)=> {
        this.category =data
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
