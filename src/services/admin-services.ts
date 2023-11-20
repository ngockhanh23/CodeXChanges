import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class AdminServices {


  constructor(private http: HttpClient) {}
  
  //category - features
  getLstCategories() : Observable<any> {
    return this.http.get('http://localhost:3000/categories');
  }

  getCategoryByID(id : String) {
    return this.http.get('http://localhost:3000/categories/'+ id);
  }

  //code product - features
  getAllCodeProducts() : Observable<any> {
    return this.http.get('http://localhost:3000/code-products');
  }

  saveCensorshipProd(censorshipPost : any) : Observable<any> {
    return this.http.post('http://localhost:3000/code-products/product-censorship', censorshipPost);
  }
  //user feature
  getListUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }
  updateStatusNotificationAdmin(userNotification : any): Observable <any>{
    return this.http.post('http://localhost:3000/users/update-status-notification-admin', userNotification );
  }

  getAdminAccountById(id: String): Observable<any> {
    return this.http.get('http://localhost:3000/users/getAdminAcountById/' + id);
  }

  //revenue feature
  getAllRechargeList() : Observable<any> {
    return this.http.get('http://localhost:3000/recharges/getAllRechargeList');
  }
 
  // withdrawal feature
  getListWithdrawalRequest(): Observable<any> {
    return this.http.get('http://localhost:3000/withdrawals/get-lst-withdrawal-request');
  }
  getWithdrawalById(id: String): Observable<any> {
    return this.http.get('http://localhost:3000/withdrawals/get-withdrawal-by-id/' + id);
  }
  changeWithdrawalRequest(withdrawal : any): Observable<any> {
    return this.http.put('http://localhost:3000/withdrawals/change-withdrawal-request', withdrawal);
  }

  //get transaction
  getAllTransactions(): Observable<any> {
    return this.http.get('http://localhost:3000/transactions/get-all-transactions');
  }

}
