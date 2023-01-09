import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/_model/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
cId: any;
  category!: Category;
  constructor(private _route: ActivatedRoute, private _category: CategoriesService, private _router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.cId = this._route.snapshot.params.cId;
    
    this._category.getCategories(this.cId).subscribe({
      next: (data: any)=>{
        this.category = data
        console.log(data);
      },
      error:(error: any)=>{
        console.log(error);
      }
    })

  }

  formSubmit(categoryForm: NgForm){
    this._category.updateCategory(this.category).subscribe({
      next: (data: Category)=>{
        Swal.fire('Successfully', 'Category Updated','success').then((e)=>{
          this._router.navigate(['/admin/categories'])
        })
      },
      error:(error:any)=>{
        console.log(error);
  
      }
    })
  }


}
