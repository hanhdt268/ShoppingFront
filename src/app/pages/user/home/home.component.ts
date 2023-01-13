import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {map} from "rxjs";
import {Product} from "../../../_model/Product.model";
import Swal from "sweetalert2";
import {ImageProcessingService} from "../../../services/image-processing.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails:any = [];
  constructor(private _product: ProductService,
              private _imageProcessing: ImageProcessingService) { }

  ngOnInit(): void {
  this.getAllProduct();
  }


  public getAllProduct(){
    // @ts-ignore
    this._product.getAllProduct()
      .pipe(
        map((x: Product[], i)=> x.map((product: Product)=>this._imageProcessing.createImages(product)))
      )
      .subscribe({
        next: (data: Product[]) => {
          console.log(data);
          // @ts-ignore
          this.productDetails = data
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in loading data', 'error')
        }
      })
  }
}
