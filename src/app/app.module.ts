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
import { MatDialogModule } from '@angular/material/dialog';
import { DownloadDialogComponent } from './pages/user-layouts/content-user-routes/product-details/download-dialog/download-dialog.component';
import { BoughtProductListComponent } from './pages/user-layouts/content-user-routes/bought-products-list/bought-product-list.component';
import { BoughtProductItemComponent } from './pages/user-layouts/content-user-routes/bought-products-list/bought-product-item/bought-product-item.component';
import { RevenueStatisticsComponent } from './pages/user-layouts/content-user-routes/revenue-statistics/revenue-statistics.component';
import { NotificationComponent } from './pages/user-layouts/content-user-routes/notification/notification.component';
import { EditProductComponent } from './pages/user-layouts/content-user-routes/edit-product/edit-product.component';
import { RevenueItemComponent } from './pages/user-layouts/content-user-routes/revenue-statistics/revenue-item/revenue-item.component';
import { AdminServices } from 'src/services/admin-services';
import { DetailCodeProdUploadedComponent } from './pages/admin-layouts/content-admin-routes/admin-home-pages/detail-code-prod-uploaded/detail-code-prod-uploaded.component';
import { AdminMemberManageComponent } from './pages/admin-layouts/content-admin-routes/admin-member-manage/admin-member-manage.component';
import { DetailMemberInforComponent } from './pages/admin-layouts/content-admin-routes/admin-member-manage/detail-member-infor/detail-member-infor.component';
import { WithdrawalRequestComponent } from './pages/user-layouts/content-user-routes/withdrawal-request/withdrawal-request.component';
import { AdminNotificationComponent } from './pages/admin-layouts/content-admin-routes/admin-notification/admin-notification.component';
import { PaymentServices } from 'src/services/payment-services';
import { SuccessfulPaymentPageComponent } from './pages/user-layouts/content-user-routes/recharge/successful-payment-page/successful-payment-page.component';
import { DepositHistoryListComponent } from './pages/user-layouts/content-user-routes/deposit-history-list/deposit-history-list.component';
import { DepositHistoryItemComponent } from './pages/user-layouts/content-user-routes/deposit-history-list/deposit-history-item/deposit-history-item.component';
import { AdminDepositListComponent } from './pages/admin-layouts/content-admin-routes/admin-deposit-list/admin-deposit-list.component';
import { AdminRevenueStatisticsComponent } from './pages/admin-layouts/content-admin-routes/admin-revenue-statistics/admin-revenue-statistics.component';
import { AdminWithdrawalRequestsComponent } from './pages/admin-layouts/content-admin-routes/admin-withdrawal-requests/admin-withdrawal-requests.component';
import { WithdrawalRequestItemComponent } from './pages/user-layouts/content-user-routes/withdrawal-request/withdrawal-request-item/withdrawal-request-item.component';
import { AdminWithdrawalDetailsComponent } from './pages/admin-layouts/content-admin-routes/admin-withdrawal-requests/admin-withdrawal-details/admin-withdrawal-details.component';
import { SearchResultsComponent } from './pages/user-layouts/content-user-routes/search-results/search-results.component';
import { AdminNotificationItemComponent } from './pages/admin-layouts/content-admin-routes/admin-notification/admin-notification-item/admin-notification-item.component';
import { RecaptchaDialogComponent } from './pages/user-layouts/content-user-routes/product-details/recaptcha-dialog/recaptcha-dialog.component';
// import { RecaptchaModule } from "ng-recaptcha";
// import { NgxCaptchaModule } from "ngx-captcha";

import { NgxCaptchaModule } from 'ngx-captcha';


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
  { path: 'detail-code-prod-admin/:id', component: DetailCodeProdUploadedComponent},
  { path: 'admin-member-manage', component: AdminMemberManageComponent},
  { path: 'admin-notification', component: AdminNotificationComponent},

  { path: 'detail-member-infor/:id', component: DetailMemberInforComponent},
  { path: 'withdrawal', component: WithdrawalRequestComponent},
  { path: 'successful-payment-page', component: SuccessfulPaymentPageComponent},
  { path: 'deposit-history-list', component: DepositHistoryListComponent},
  { path: 'admin-deposit-list', component: AdminDepositListComponent},
  { path: 'admin-revenue-statistics', component: AdminRevenueStatisticsComponent},
  { path: 'admin-withdrawal-requests', component: AdminWithdrawalRequestsComponent},
  { path: 'admin-withdrawal-details/:id', component: AdminWithdrawalDetailsComponent},
  { path: 'search-results/:search-key', component: SearchResultsComponent},
  













  
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
    DetailCodeProdUploadedComponent,
    AdminMemberManageComponent,
    DetailMemberInforComponent,
    WithdrawalRequestComponent,
    AdminNotificationComponent,
    SuccessfulPaymentPageComponent,
    DepositHistoryListComponent,
    DepositHistoryItemComponent,
    AdminDepositListComponent,
    AdminRevenueStatisticsComponent,
    AdminWithdrawalRequestsComponent,
    WithdrawalRequestItemComponent,
    AdminWithdrawalDetailsComponent,
    SearchResultsComponent,
    AdminNotificationItemComponent,
    RecaptchaDialogComponent,

    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(lstRoutes, {useHash: true}),
    ToastrModule.forRoot(),
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxCaptchaModule
  ],
  exports: [RouterModule],
  providers: [DatePipe,UserServices, AdminServices, PaymentServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
