import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product: any =[]
  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this._product.getAllProduct().subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error')
      }
    })
  }


  delete(pId: any){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._product.deleteProduct(pId).subscribe({
          next: (data: any) => {
            this.product = this.product.filter((product: any) => product.pId != pId)
            Swal.fire('Successfully', 'Quiz deleted', 'success')
          },
          error: (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error')

          }
        })
      }
    })
  }
}
