import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { Product } from 'src/app/_model/Product.model';
import Swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";
import {ManufacturerService} from "../../../services/manufacturer.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent implements OnInit {


   isNewProduct = true;
  manufacturers: any = []

  product: Product={
    // @ts-ignore
    pId: null,
    title: '',
    description: '',
    price: 0,
    discountPrice: 0,
    images: '',
    active: true,
    productImages: [],
    manufacturer: {
      mId: '',
    }
  }

  constructor(private _snack: MatSnackBar, private _category: CategoriesService, private _product: ProductService,
    private _sanitizer: DomSanitizer, private _activeRoute: ActivatedRoute,
              private _manufacturer: ManufacturerService) { }

  ngOnInit(): void {

    this._manufacturer.getManufacturers().subscribe({
      next: (data: any) => {
        this.manufacturers = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data from serve', 'error')
      }
    })
    this.product = this._activeRoute.snapshot.data['product'];
    if (this.product && this.product.pId){
      this.isNewProduct = false;
    }
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
        this.product.productImages = []
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
    // console.log(event)
    if(event.target.files){
      const file = event.target.files[0];
      console.log( window.URL.createObjectURL(file))
      const fileHandle: FileHandle ={
        file: file,
        url:  this._sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle);
      }



      // console.log(this.product.productImages.length)
      // console.log(this.product.productImages)

    //   let reader = new FileReader();
    // reader.onload = (e) =>{
    //  this.rsultImage = e.target?.result ? e.target?.result.toString() : "";
    // }
    // reader.readAsDataURL(file);
    }

    removeImage(i:number){
        this.product.productImages.splice(i,1);
    }

    fileDropped(fileHandler: FileHandle){
this.product.productImages.push(fileHandler)
    }
}
