import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {map} from "rxjs";
import {Product} from "../../../_model/Product.model";
import Swal from "sweetalert2";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mId: any;
  productDetails:any = [];
  constructor(private _product: ProductService,
              private _imageProcessing: ImageProcessingService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();


  // this._route.params.subscribe((params)=>{
  //   // @ts-ignore
  //   this.muId = params.muId;
  //   if(this.muId == 0){
  //     // @ts-ignore
  //     this._product.getActiveProduct()
  //       // @ts-ignore
  //       .pipe(map((x: Product[], i)=> x.map((product: Product)=>this._imageProcessing.createImages(product))))
  //       .subscribe({
  //       next: (data: Product[])=>{
  //         console.log(data);
  //         this.productDetails = data;
  //       },
  //       error: (error) => {
  //         console.log(error)
  //       }
  //     })
  //     console.log("Load all product")
  //   }else {
  //     // @ts-ignore
  //     this._product.getActiveProductOfManufacturer(this.muId)
  //       // @ts-ignore
  //       .pipe(map((x: Product[], i)=> x.map((product: Product)=>this._imageProcessing.createImages(product))))
  //       .subscribe({
  //       next: (data: Product[])=>{
  //         this.productDetails = data
  //       },
  //       error: (error)=>{
  //         console.log(error)
  //       }
  //     })
  //   }
  // })
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
  showProductDetails(pId: any){
    this._router.navigate(['productViewDetails',{pId: pId}])
  }
}
