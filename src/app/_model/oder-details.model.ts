import {OrderQuantity} from "./order-quantity.model";

export interface OderDetails{
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  alternateContact: string;
  oderProductQuantityList: OrderQuantity[];
}
