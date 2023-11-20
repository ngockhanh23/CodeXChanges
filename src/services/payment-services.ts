import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentServices {

  constructor(private http: HttpClient) { }

  createPayment(transaction: any): Observable<any> {
    return this.http.post('http://localhost:8888/order/create_payment_url', transaction);
  }

  createRecharge(recharge: any): Observable<any> {
    return this.http.post('http://localhost:3000/recharges', recharge);
  }

  getRechargeByTransactionCode(transactionCode : String): Observable<any> {
    return this.http.get('http://localhost:3000/recharges/getRechargeByTransactionCode/'+ transactionCode);
  }

  getRechargeByReferenceCode(referenceCode : String): Observable<any> {
    return this.http.get('http://localhost:3000/recharges/getRechargeByReferenceCode/'+ referenceCode);
  }

}
