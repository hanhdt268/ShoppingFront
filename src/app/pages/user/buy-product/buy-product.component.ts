import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {OderDetails} from "../../../_model/oder-details.model";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../_model/Product.model";
import {ProductService} from "../../../services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] =[]
  orderDetails: OderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContact: '',
    oderProductQuantityList: []
  }
  constructor(private _activeRoute: ActivatedRoute,
              private _productService: ProductService) { }

  ngOnInit(): void {
    this.productDetails = this._activeRoute.snapshot.data['productDetails'];

    this.productDetails.forEach(
      x => this.orderDetails.oderProductQuantityList.push(
        {pId: x.pId, quantity: 1}
      )
    )

    console.log(this.productDetails)
    console.log(this.orderDetails)
  }

  public placeOder(oderForm: NgForm) {
    this._productService.placeOder(this.orderDetails).subscribe({
      next: (data)=>{
        Swal.fire('Success', '', 'success')
        oderForm.reset()

      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
