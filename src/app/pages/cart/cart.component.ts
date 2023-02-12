import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Image', 'Name', 'Price', 'DiscountPrice'];
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
}
