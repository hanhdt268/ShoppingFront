import { Component, OnInit } from '@angular/core';
import {Manufacturer} from "../../../_model/manufacturer.model";
import {ManufacturerService} from "../../../services/manufacturer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgForm} from "@angular/forms";
import {Category} from "../../../_model/category.model";
import Swal from "sweetalert2";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
  // @ts-ignore
  categories: any = []
  manufacturer: Manufacturer = {
    title: '',
    description: '',
    category: {
      cId: ''
    }
  }
  constructor(private _manufacturer: ManufacturerService,private _snack: MatSnackBar, private _category: CategoriesService) { }

  ngOnInit(): void {
    this._category.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data from serve', 'error')
      }
    })
  }

  formSubmit(manufacturerForm: NgForm) {
    if (this.manufacturer.title.trim() == '' || this.manufacturer.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000
      })
      return;
    }

    //all done
    this. _manufacturer.addManufacturer(this.manufacturer).subscribe({
      next: (data: Manufacturer) => {
        this.manufacturer.title = '';
        this.manufacturer.description = '';
        Swal.fire('Success', '', 'success')
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', '', 'error')
      }
    })
  }
}
