import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {MyOrderDetails} from "../../../_model/order.model";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  dataSource: MyOrderDetails[] =[]
  constructor(private _productService: ProductService) { }

  displayedColumns = ['Id', 'ProductName', 'Name','Address', 'Contact', 'Status']
  ngOnInit(): void {
    this.getAllOrderDetails()
  }


  public getAllOrderDetails(){
    this._productService.getAllOderDetails().subscribe({
      next: (resp)=>{
        console.log(resp);
        this.dataSource = resp
      },error: (error)=>{
        console.log(error)
      }
    })
  }
}
