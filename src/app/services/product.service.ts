import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/Product.model';
import {OderDetails} from "../_model/oder-details.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private apiBaseUrl = environment.apiBaseUrl

  constructor(private _http: HttpClient) { }

  //add product
  public addProduct(product: FormData){
    return this._http.post<Product>(`${this.apiBaseUrl}/product/`, product)
  }

  //update product
  public updateProduct(product: Product){
    return this._http.put<Product>(`${this.apiBaseUrl}/product/`, product)
  }

  //get product by id
  public getProductById(pId: any){
    return this._http.get(`${this.apiBaseUrl}/product/${pId}`)
  }

  //get all
  public getAllProduct(pageNumber: any){
    return this._http.get<Product[]>(`${this.apiBaseUrl}/product/?pageNumber=`+pageNumber)
  }

  //delete
  public deleteProduct(pId: any){
    return this._http.delete(`${this.apiBaseUrl}/product/${pId}`)
  }

  //get Product of category
  public getProductOfCategory(mId: any){
    return this._http.get(`${this.apiBaseUrl}/product/manufacturer/${mId}`)
  }


  public getActiveProduct() {
    return this._http.get(`${this.apiBaseUrl}/product/active`)
  }

  //get active product of manufacturer
  public getActiveProductOfManufacturer(mId: any) {
    return this._http.get(`${this.apiBaseUrl}/product/manufacturer/active/${mId}`)
  }

  public getProductDetails(isSingleProductCheckOut: any, pId: any){
   return this._http.get<Product[]>(`${this.apiBaseUrl}/product/${isSingleProductCheckOut}/${pId}`)
  }

  //create oder
  public placeOder(oderDetails: OderDetails){
   return  this._http.post(`${this.apiBaseUrl}/oder/`, oderDetails)
  }
}
