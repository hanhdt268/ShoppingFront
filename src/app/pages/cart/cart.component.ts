import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Image', 'Name', 'Price', 'DiscountPrice'];
  constructor(private _productService: ProductService) { }

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
}
