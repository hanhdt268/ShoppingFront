import { Component, OnInit } from '@angular/core';
import {Product} from "../../../_model/Product.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {
  // @ts-ignore
  product: Product

  selectedProductIndex = 0;
  constructor(private _activeRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.product = this._activeRoute.snapshot.data['product'];
    console.log(this.product)
  }
  changeIndex(index: any){
    this.selectedProductIndex = index;
    console.log(index)
  }

  buyProduct(pId: any) {
    this._router.navigate(['/buyProduct',{
      isSingleProductCheckOut: true, id: pId
    }] )
  }
}
