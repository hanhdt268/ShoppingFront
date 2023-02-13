import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Image', 'Name', 'Price', 'DiscountPrice','Action'];
  constructor(private _productService: ProductService, private _router:Router) { }

  cartDetails: any[] = []
  ngOnInit(): void {
    this.getCartDetails();
  }

  public getCartDetails(){
    this._productService.getCartDetails().subscribe({
      next: (response: any)=>{
        this.cartDetails = response;

        console.log(response)
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }


  handleCheckout() {
    this._router.navigate(['/buyProduct',{
      isSingleProductCheckOut: false, id: 0
    }] )
    // this._productService.getProductDetails(false, 0).subscribe({
    //   next:(response)=>{
    //     console.log(response)
    //   },error:(error)=>{
    //     console.log(error)
    //   }
    // })
  }

  delete(cartId: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure delete ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteCartById(cartId).subscribe({
          next: (response)=>{
            console.log(response)
            this.getCartDetails();
          },error:(error)=>{
            console.log(error)
          }
        })
      }

    })
  }

}
