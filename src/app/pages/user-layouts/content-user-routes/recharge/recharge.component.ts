import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  accountUser: any;

  constructor(private authServices: AuthServices, private router: Router) { }

  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();

    if(this.authServices.userLoginExisting == null){
        this.router.navigate(['login']);
    }
  }
}
