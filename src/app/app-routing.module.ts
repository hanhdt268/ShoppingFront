import { NgModule } from '@angular/core';
import {ActivatedRoute, RouterModule, Routes} from '@angular/router';
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
// import {SidebarUserComponent} from "./pages/user/sidebar-user/sidebar-user.component";
import {ClientGuard} from "./services/client.guard";
import {ClientDashbordComponent} from "./pages/user/client-dashbord/client-dashbord.component";
import {ProductViewDetailsComponent} from "./pages/user/product-view-details/product-view-details.component";
import {BuyProductComponent} from "./pages/user/buy-product/buy-product.component";
import {BuyProductResolverServiceService} from "./services/buy-product-resolver-service.service";
import {CartComponent} from "./pages/cart/cart.component";
import {MyOrdersComponent} from "./pages/user/my-orders/my-orders.component";
import {OrderDetailsComponent} from "./pages/admin/order-details/order-details.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {UpdateProfileComponent} from "./pages/update-profile/update-profile.component";

const routes: Routes = [
 {
  path: 'client-dashboard',
  component: ClientDashbordComponent,
   canActivate: [ClientGuard],
   children: [
     {
       path: ':cId',
       component: HomeComponent
     },
   ],
 },
  {
    path: 'productViewDetails',
    component: ProductViewDetailsComponent,
    resolve: {
      product: ProductResolveService
    }
  },
  {
    path: 'buyProduct',
    component: BuyProductComponent,
    resolve: {
      productDetails: BuyProductResolverServiceService
    }

  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'myOrders',
    component: MyOrdersComponent,
    canActivate: [ClientGuard]
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
      path: 'profile',
      component: ProfileComponent,
    },

    {
      path: 'orderDetails',
      component: OrderDetailsComponent
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
    },

  ],
  canActivate: [AdminGuard]
 },
 {
  path: 'signup',
  component: SignupComponent,
  pathMatch: "full",
 },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
