import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/_model/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = {
    title: '',
    description: ''
  }
  constructor(private _category: CategoriesService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(category: NgForm) {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000
      })
      return;
    }

    //all done
    this._category.addCategory(this.category).subscribe({
      next: (data: Category) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success', '', 'success')
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', '', 'error')
      }
    })
  }

}
