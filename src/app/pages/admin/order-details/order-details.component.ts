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
  status = "All"
  constructor(private _productService: ProductService) { }

  displayedColumns = ['Id', 'ProductName', 'Name','Address', 'Contact', 'Status']
  ngOnInit(): void {
    this.getAllOrderDetails(this.status);
  }


  public getAllOrderDetails(statusParameter: any){
    this._productService.getAllOderDetails(statusParameter).subscribe({
      next: (resp)=>{
        console.log(resp);
        this.dataSource = resp
      },error: (error)=>{
        console.log(error)
      }
    })
  }
}
