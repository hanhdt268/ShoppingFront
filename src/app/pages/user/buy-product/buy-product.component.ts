import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {OderDetails} from "../../../_model/oder-details.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../_model/Product.model";
import {ProductService} from "../../../services/product.service";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  isCartCheckout: string | null = '';
  constructor(private _activeRoute: ActivatedRoute,
              private _productService: ProductService,
              private _router: Router,
              private _snack: MatSnackBar) { }



  ngOnInit(): void {
    this.productDetails = this._activeRoute.snapshot.data['productDetails'];
    console.log(this.productDetails)
    this.isCartCheckout = this._activeRoute.snapshot.paramMap.get('isSingleProductCheckOut')
    this.productDetails.forEach(
      x => this.orderDetails.oderProductQuantityList.push(
        {pId: x.pId, quantity: 1}
      )
    )

    console.log(this.productDetails)
    console.log(this.orderDetails)
  }

  public placeOder(oderForm: NgForm) {
    if (this.orderDetails.fullName.trim() =='' || this.orderDetails.fullName == null){
      this._snack.open('fullName required','', {
        duration: 3000
      })
    }
    if (this.orderDetails.fullAddress.trim() =='' || this.orderDetails.fullAddress == null){
      this._snack.open('fullAddress required','', {
        duration: 3000
      })
    }
    if (this.orderDetails.contactNumber.trim() =='' || this.orderDetails.contactNumber == null){
      this._snack.open('contactNumber required','', {
        duration: 3000
      })
    }
    if (this.orderDetails.alternateContact.trim() =='' || this.orderDetails.alternateContact == null){
      this._snack.open('alternateContact required','', {
        duration: 3000
      })
    }

    Swal.fire({
      title: 'Your oder is place successfully, It will get delivery to you with 4-5 business day',
      icon: "success",
      timer: 2000,
      // didOpen: () => {
      //   // @ts-ignore
      //   Swal.showLoading()
      //   // @ts-ignore
      //   const b = Swal.getHtmlContainer().querySelector('b')
      //   timerInterval = setInterval(() => {
      //     // @ts-ignore
      //     b.textContent = Swal.getTimerLeft()
      //   }, 100)
      // },
      // willClose: () => {
      //   clearInterval(timerInterval)
      // }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this._productService.placeOder(this.orderDetails, this.isCartCheckout).subscribe({
          next: (data)=>{
            oderForm.reset();
            this._router.navigate(['client-dashboard'])
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }
    })
  }

  getQuantityForProduct(pId: any) {
    const filterProduct = this.orderDetails.oderProductQuantityList.filter(
      (productQuantity) => productQuantity.pId === pId
    )
    return filterProduct[0].quantity
  }

  getCalculatedProduct(pId: number, discountPrice: number) {
     const  filterProduct =this.orderDetails.oderProductQuantityList.filter(
      (productQuantity) => productQuantity.pId === pId
    )
    return  filterProduct[0].quantity * discountPrice
  }

  onQuantityChanged(q: any, pId: number) {
    this.orderDetails.oderProductQuantityList.filter(
      (oderProduct) => oderProduct.pId === pId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let  grandTotal = 0;
    this.orderDetails.oderProductQuantityList.forEach(
      (productQuantity) =>{
         const price = this.productDetails.filter(product => product.pId === productQuantity.pId)[0].discountPrice;
        grandTotal = grandTotal + price *  productQuantity.quantity
      }
    )
    return grandTotal;
  }
}
