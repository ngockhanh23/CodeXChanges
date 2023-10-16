import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class UserServices {


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

  getApprovedProductList(): Observable<any> {
    return this.http.get('http://localhost:3000/code-products/get-approved-product-list');
  }
  getCodeProductById(id:String) : Observable<any>{
    return this.http.get('http://localhost:3000/code-products/'+ id);
  }

  uploadCodeProduct(codeProd : any) : Observable<any>{
    return this.http.post('http://localhost:3000/code-products', codeProd);
  }

  //transaction -feature
  createTransaction(data : any) : Observable<any>{
    return this.http.post('http://localhost:3000/transactions', data);
  }
  getTransactionByProductAndBuyer(data : any) : Observable <any>{
    return this.http.post('http://localhost:3000/transactions/get-transaction-product-by-buyer', data);

  }
  updateNumberOfView(data : any): Observable<any>{
    return this.http.put('http://localhost:3000/code-products/update-number-of-views/' + data._id, data);
  }
  updateNumberOfDownload(data : any): Observable<any>{
    return this.http.put('http://localhost:3000/code-products/update-number-of-download/' + data._id, data);
  }

  //comment
  postComment(data : any) : Observable <any>{
    return this.http.post('http://localhost:3000/comments', data);
  }

  getCommentsListByProdId(idProd : String): Observable <any>{
    return this.http.get('http://localhost:3000/comments/get-comments-list-by-prod-id/'+ idProd );
  }
  delteteComment(id:String): Observable <any>{
    return this.http.delete('http://localhost:3000/comments/'+ id );
  }

  updateStatusNotificationUser(userNotification : any): Observable <any>{
    return this.http.post('http://localhost:3000/users/update-status-notification-user', userNotification );
  }

}
