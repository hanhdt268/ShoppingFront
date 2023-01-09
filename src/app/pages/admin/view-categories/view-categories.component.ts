import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any = []
  constructor(private _category: CategoriesService) { }

  ngOnInit(): void {
    this._category.categories().subscribe({
      next: (data: any) => {
        this.categories = data
        console.log(data)
      },
      error: (error) => {
        console.log(error)
        Swal.fire('Error !!', 'Error in login data', 'error')
      }
    })
  }

  delete(cId: any){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(cId).subscribe({
          next: (data: any) => {
            this.categories = this.categories.filter((category: any) => category.cId != cId)
            Swal.fire('Successfully', 'Quiz deleted', 'success')
          },
          error: (error: any) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error')
          }
        })
      }
    })
  }

}
