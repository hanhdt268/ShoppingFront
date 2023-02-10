import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/_model/Product.model';
import Swal from 'sweetalert2';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  showLoadMoreProduct = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] =[]
  constructor(private _product: ProductService, private _imagesDialog: MatDialog, private _imageProcessing: ImageProcessingService,
    private _route: Router) { }
  displayedColumns: string[] = ['Id', 'Product Name', 'Product ActualPrice', 'Product DiscountPrice','Actions'];
  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct(searchKey: string = ""){
    this.showTable = false;
    // @ts-ignore
    this._product.getAllProduct(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i)=> x.map((product: Product)=>this._imageProcessing.createImages(product)))
      )
      .subscribe({
        next: (data: Product[]) => {
          console.log(data);
          data.forEach(product => this.productDetails.push(product))
          this.showTable = true;
          if (data.length == 3){
            this.showLoadMoreProduct = true;
          }else {
            this.showLoadMoreProduct = false;
          }
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
            this.productDetails = this.productDetails.filter((product: any) => product.pId != pId)
            Swal.fire('Successfully', 'Quiz deleted', 'success')
          },
          error: (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error')

          }
        })
      }
    })
  }
  openImages(product: Product){
    console.log(product);
    this._imagesDialog.open(ShowProductImagesDialogComponent,{
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    })
  }
  editProductDetails(pId: any){
      this._route.navigate(['/admin/add-product',{pId: pId}])
  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct();
  }

  searchByKeyword(searchKeyword: any) {
    console.log(searchKeyword);
    this.pageNumber =0;
    this.productDetails = [];
    this.getAllProduct(searchKeyword);
  }
}
