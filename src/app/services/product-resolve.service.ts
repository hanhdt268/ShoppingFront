import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import { Product } from '../_model/Product.model';
import {ProductService} from "./product.service";
import {ImageProcessingService} from "./image-processing.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private _product: ProductService, private _imageProcessing: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id =route.paramMap.get("pId");
    if (id){
      //then we have to fetch details from backend

      // @ts-ignore
      return  this._product.getProductById(id)
        .pipe(map(p=>this._imageProcessing.createImages(p)))
    }else {
      //return empty product observable
      // @ts-ignore
      return  of(this.getProductDetails());
    }
  }
  getProductDetails(){
    return{
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
  }
}
