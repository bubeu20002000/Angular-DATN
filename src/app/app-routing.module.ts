import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserAddressEditComponent } from './user-address-edit/user-address-edit.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { MainComponent } from './_admin/main/main.component';

const routes: Routes = [
  { path:"", component:HomeComponent },
  { path:"cart", component:CartComponent },
  { path:"check-out", component:CheckoutComponent },
  { path:"orders", component:OrdersComponent },

  { path:"product-all", component:AllproductsComponent },
  { path:"product-single", component:ProductsingleComponent },

  { path:"user", component:UserComponent },
  { path:"user-details", component:UserDetailsComponent },
  { path:"user-address", component:UserAddressComponent },
  { path:"user-address-edit", component:UserAddressEditComponent },
  
  { path:"login", component:LoginComponent },
  { path:"signup", component:SignupComponent },
  { path:"forgot-password", component:ForgotPasswordComponent },

  {path: '404', component: PageNotfoundComponent},
  {path: '**', redirectTo: '/404'},

  {path: 'admin', component: MainComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
