import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root', 
  })
  export class AuthServices { 
    
    adminLoginExisting : any =null;
    userLoginExisting : any = null;
    // coinBalanceUser : Number = 0;
    userLoginEmitter : EventEmitter<any> = new EventEmitter<any>();
    adminLoginEmitter : EventEmitter<any> = new EventEmitter<any>();
    // coinBalanceUserEmitter : EventEmitter<number> = new EventEmitter<number>();


    constructor(private http: HttpClient) {}

    //user auth
    getUserById(id:String):Observable<any>{
      return this.http.get('http://localhost:3000/users/' + id);
    }
    checkRoleAccount(id:String) : Observable<any>{
      return this.http.get('http://localhost:3000/users/checkRoleAccount/' + id);

    }
    getAdminAccountById(id:String) : Observable<any>{
      return this.http.get('http://localhost:3000/users/getAdminAcountById/' + id);

    }
    setAdminLogged(adminAcount : any){
      this.adminLoginExisting = adminAcount;
      console.log(adminAcount)
      this.adminLoginEmitter.emit(this.adminLoginExisting);
      localStorage.setItem('account_id', adminAcount._id.toString());

      // console.log(this.userLoginExisting)
    }
    setUserLogged(user : any){
      this.userLoginExisting = user;
      this.userLoginEmitter.emit(this.userLoginExisting);
      localStorage.setItem('account_id', user._id);
      // this.coinBalanceUser = user.coin_Balance;
      // console.log(this.userLoginExisting)
    }
    


    getUserLoginExisting(){
      return this.userLoginExisting;
    }
    clearUserLogged(){

      this.userLoginExisting = null;
      this.userLoginEmitter.emit(null);

      this.adminLoginExisting = null;
      this.adminLoginEmitter.emit(null);
      localStorage.removeItem('account_id');

    }

    clearAdminAccountLogged(){
      const accountLogged = localStorage.getItem('account_id');
      if(accountLogged != null){
        this.checkRoleAccount(accountLogged).subscribe((res) =>{
          if(res.role =="admin"){
            this.adminLoginExisting = null;
            this.adminLoginEmitter.emit(null);
            localStorage.removeItem('account_id');
          }
        })
      }

     
    }

    loginUser(account : any): Observable<any> {
      return this.http.post('http://localhost:3000/users/getUserLogin', account);
    }

    registerAccount(account : any): Observable<any> {
      return this.http.post('http://localhost:3000/users/register', account);
    }
}