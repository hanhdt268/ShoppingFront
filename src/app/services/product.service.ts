import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/Product.model';
import {OderDetails} from "../_model/oder-details.model";
import {MyOrderDetails} from "../_model/order.model";
import {Observable} from "rxjs";

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
  public getAllProduct(pageNumber: any, searchKey: string = ""){
    return this._http.get<Product[]>(`${this.apiBaseUrl}/product/?pageNumber=`+pageNumber+"&searchKey="+ searchKey)
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
  public getActiveProductOfManufacturer(cId: any) {
    return this._http.get(`${this.apiBaseUrl}/product/category/active/${cId}`)
  }

  public getProductDetails(isSingleProductCheckOut: any, pId: any){
   return this._http.get<Product[]>(`${this.apiBaseUrl}/product/${isSingleProductCheckOut}/${pId}`)
  }

  //create oder
  public placeOder(oderDetails: OderDetails, isCartCheckout: any){
   return  this._http.post(`${this.apiBaseUrl}/oder/${isCartCheckout}`, oderDetails)
  }

  //add to cart
  public addToCart(pId: any){
   return this._http.get(`${this.apiBaseUrl}/addToCart/${pId}`)
  }

  //get all cart
  public getCartDetails(){
   return this._http.get(`${this.apiBaseUrl}/addToCart/`)
  }

  //delete cart by id
  public deleteCartById(cartId: any){
   return this._http.delete(`${this.apiBaseUrl}/addToCart/${cartId}`)
  }


  //get orderDetails by user
  public getOderDetails(): Observable<MyOrderDetails[]>{
   return this._http.get<MyOrderDetails[]>(`${this.apiBaseUrl}/oder/`)
  }

  //get all order
  public getAllOderDetails(): Observable<MyOrderDetails[]>{
    return this._http.get<MyOrderDetails[]>(`${this.apiBaseUrl}/oder/getAllOrderDetails`)
  }

  //get delivery
  public markOrderAsDelivered(oder: any){
   return this._http.get(`${this.apiBaseUrl}/oder/markOrderAsDelivered/${oder}`)
  }

  public markOrderAsDestroy(oder: any){
    return this._http.get(`${this.apiBaseUrl}/oder/cancelOder/${oder}`)
  }
}
