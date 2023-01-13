import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewProductComponent } from './pages/admin/view-product/view-product.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/user/home/home.component';
import { AdminGuard } from './services/admin.guard';
import {ProductResolveService} from "./services/product-resolve.service";

const routes: Routes = [
 {
  path: '',
  component: HomeComponent,
  pathMatch: "full"
 },
 {
  path: 'login',
  component: LoginComponent,
  pathMatch: "full"
 },
 {
  path: 'admin',
  component: DashboardComponent,
  children: [
    {
      path: 'categories',
      component: ViewCategoriesComponent
    },
    {
      path: 'add-category',
      component: AddCategoryComponent
    },
    {
      path: 'category/:cId',
      component: UpdateCategoryComponent
    },
    {
      path: 'product',
      component: ViewProductComponent
    },
    {
      path: 'add-product',
      component: AddProductComponent,
      resolve: {
        product: ProductResolveService
      }
    },
    {
      path: 'product/:pId',
      component: UpdateProductComponent
    }
  ],
  canActivate: [AdminGuard]
 },
 {
  path: 'signup',
  component: SignupComponent,
  pathMatch: "full",
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
