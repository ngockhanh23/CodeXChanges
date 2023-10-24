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

 

}