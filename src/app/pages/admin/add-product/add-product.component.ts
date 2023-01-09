import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { Product } from 'src/app/_model/Product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: any = []
  product: Product={
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    images: '',
    active: true,
    productImages: [],
    category: {
      cId: '',
    }
  }
    
  constructor(private _snack: MatSnackBar, private _category: CategoriesService, private _product: ProductService,
    private _sanitizer: DomSanitizer) { }

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
  addSubmit(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product)
    if (this.product.title.trim() == '' || this.product.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000
      });
      return;
    }
    this._product.addProduct(productFormData).subscribe({
      next: (data: Product) => {
        Swal.fire('Successfully', 'Add Quiz Successfully', "success")
        productForm.reset();
      },
      error: (error) => {
        Swal.fire('Error', '', "error");
        console.log(error)
      }
    })
  }


  prepareFormData(product: Product): FormData{
    const formData = new FormData();
    formData.append(
      'product',
      new Blob ([JSON.stringify(product)], {type: 'application/json'})
    );
    for(var i = 0; i < product.productImages.length; i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }
    return formData;
  }
  onFileSelected(event: any){
    if(event.target.files){
      const file = event.target.files[0];
      const fileHandle: FileHandle ={
        file: file,
        url: this._sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle)
    }

  }
}
