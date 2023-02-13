import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {MyOrderDetails} from "../../../_model/order.model";


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrderDetails: MyOrderDetails[] = []
  constructor(private _productService: ProductService) { }
  displayedColumns = ['Name', 'Address', 'ContactNumber','Amount', 'Status','Action'];
  ngOnInit(): void {
    this.getOderDetails();
  }


  public getOderDetails(){
    this._productService.getOderDetails().subscribe({
      next: (response: MyOrderDetails[])=>{
        console.log(response)
        this.myOrderDetails = response;
      },error:(error)=>{
        console.log(error)
      }
    })
  }

  markOrderAsDelivered(oderId: any) {
    this._productService.markOrderAsDelivered(oderId).subscribe({
      next: (resp:any)=>{
        console.log(resp)
        this.getOderDetails()
      },
      error:(error) => {
        console.log(error)
      }
    })
  }

  markOrderAsDestroy(oderId: any) {
    this._productService.markOrderAsDestroy(oderId).subscribe({
      next: (resp:any)=>{
        console.log(resp)
        this.getOderDetails()
      },
      error:(error) => {
        console.log(error)
      }
    })
  }
}
