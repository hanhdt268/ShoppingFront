import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  pId: any;

  product: any;
  categories: any;
  constructor(private _route: ActivatedRoute, private _category: CategoriesService, private _product: ProductService, private _router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.pId = this._route.snapshot.params.pId
    this._product.getProductById(this.pId).subscribe({
      next: (data: any) => {
        this.product = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    });
    this._category.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  updateProduct(productForm: NgForm) {
    this._product.updateProduct(this.product).subscribe({
      next: (data: any) => {
        Swal.fire('Successfully', "Quiz updated", 'success').then((e) => {
          this._router.navigate(['/admin/product'])
        })
      },
      error: (error) => {
        Swal.fire('Error', 'Error in updating quiz', 'error')
        console.log(error)
      }
    })
  }

  onFileSelected(event: any){
    
  }

}
