import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { ProductsComponent } from './products/products.component';



const routes: Routes = [{ path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
