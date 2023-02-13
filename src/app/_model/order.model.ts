import {Product} from "./Product.model";

export interface MyOrderDetails{
  oderId: number,
  oderFullName: string,
  oderFullOder: string,
  oderContactNumber: string,
  alternateContact: string,

  oderAmount: number,
  oderStatus: string,

  product: Product,
  user: any

}
