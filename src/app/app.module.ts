import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './pages/user/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { authInterceptorProvides } from './services/auth.interceptor';
import { SignupComponent } from './pages/signup/signup.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewProductComponent } from './pages/admin/view-product/view-product.component';
import { ViewOderComponent } from './pages/admin/view-oder/view-oder.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from './pages/admin/show-product-images-dialog/show-product-images-dialog.component';
import { SidebarUserComponent } from './pages/user/sidebar-user/sidebar-user.component';
import { LoadManufacturerComponent } from './pages/user/load-manufacturer/load-manufacturer.component';
import { ClientDashbordComponent } from './pages/user/client-dashbord/client-dashbord.component';
import { ProductViewDetailsComponent } from './pages/user/product-view-details/product-view-details.component';
import { BuyProductComponent } from './pages/user/buy-product/buy-product.component';
import { CartComponent } from './pages/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    SidebarComponent,
    ViewCategoriesComponent,
    ViewProductComponent,
    ViewOderComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddProductComponent,
    UpdateProductComponent,
    DragDirective,
    ShowProductImagesDialogComponent,
    SidebarUserComponent,
    LoadManufacturerComponent,
    ClientDashbordComponent,
    ProductViewDetailsComponent,
    BuyProductComponent,
    CartComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        MatGridListModule,
        MatTableModule,
        MatDialogModule
    ],
  providers: [authInterceptorProvides],
  bootstrap: [AppComponent]
})
export class AppModule { }
