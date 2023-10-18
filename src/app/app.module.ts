import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from "../environments/environment";



import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './pages/user-layouts/header/header.component';
import { FooterComponent } from './pages/user-layouts/footer/footer.component';
import { HomePagesComponent } from './pages/user-layouts/content-user-routes/home-pages/home-pages.component';

import { CategoriesComponent } from './pages/user-layouts/content-user-routes/categories/categories.component';
import { ProductDetailsComponent } from './pages/user-layouts/content-user-routes/product-details/product-details.component';
import { LoginComponent } from './pages/user-layouts/content-user-routes/login/login.component';
import { RegisterComponent } from './pages/user-layouts/content-user-routes/register/register.component';
import { UserProductUploadedListComponent } from './pages/user-layouts/content-user-routes/user-product-uploaded-list/user-product-uploaded-list.component';
import { ProductUploadItemComponent } from './pages/user-layouts/content-user-routes/user-product-uploaded-list/product-upload-item/product-upload-item.component';
import { UploadProductsPageComponent } from './pages/user-layouts/content-user-routes/upload-products-page/upload-products-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserServices } from 'src/services/users-services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ProductCardsComponent } from './pages/user-layouts/content-user-routes/product-cards/product-cards.component';
import { AdminHomePagesComponent } from './pages/admin-layouts/content-admin-routes/admin-home-pages/admin-home-pages.component';
import { AdminDashboardComponent } from './pages/admin-layouts/admin-dashboard/admin-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RechargeComponent } from './pages/user-layouts/content-user-routes/recharge/recharge.component';
// import {MatDialogModule} from '@angular/mat'
import { MatDialogModule } from '@angular/material/dialog';
import { DownloadDialogComponent } from './pages/user-layouts/content-user-routes/product-details/download-dialog/download-dialog.component';
import { BoughtProductListComponent } from './pages/user-layouts/content-user-routes/bought-products-list/bought-product-list.component';
import { BoughtProductItemComponent } from './pages/user-layouts/content-user-routes/bought-products-list/bought-product-item/bought-product-item.component';
import { RevenueStatisticsComponent } from './pages/user-layouts/content-user-routes/revenue-statistics/revenue-statistics.component';
import { NotificationComponent } from './pages/user-layouts/content-user-routes/notification/notification.component';
import { EditProductComponent } from './pages/user-layouts/content-user-routes/edit-product/edit-product.component';
import { RevenueItemComponent } from './pages/user-layouts/content-user-routes/revenue-statistics/revenue-item/revenue-item.component';


const lstRoutes: Routes = [
  { path: '', component: HomePagesComponent },
  { path: 'categories/:id', component: CategoriesComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'admin-home', component: AdminHomePagesComponent},
  {path: 'recharge', component: RechargeComponent},
  { path: 'get-products-upload-user', component: UserProductUploadedListComponent },
  { path: 'get-users-bought-product-list', component: BoughtProductListComponent },
  { path: 'upload-product-user', component: UploadProductsPageComponent },
  { path: 'edit-code-product/:id', component: EditProductComponent},
  { path: 'notification', component: NotificationComponent},
  { path: 'revenues', component: RevenueStatisticsComponent},


  
];

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    HomePagesComponent,

    CategoriesComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    UserProductUploadedListComponent,
    ProductUploadItemComponent,
    UploadProductsPageComponent,
    ProductCardsComponent,
    AdminHomePagesComponent,
    AdminDashboardComponent,
    RechargeComponent,
    DownloadDialogComponent,
    BoughtProductListComponent,
    BoughtProductItemComponent,
    RevenueStatisticsComponent,
    NotificationComponent,
    EditProductComponent,
    RevenueItemComponent,

    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(lstRoutes, {useHash: true}),
    ToastrModule.forRoot(),
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
    
    
  ],
  exports: [RouterModule],
  providers: [DatePipe,UserServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
