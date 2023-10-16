import { AuthServices } from 'src/services/authentication-service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserServices } from 'src/services/users-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userLogin : any;
  // coinBalanceUser : number = 0;
  lstCategories: any;
  countUnreadNoti = 0;

  constructor( private authServices:AuthServices,private userServices : UserServices, private toastr: ToastrService, private router : Router){}

  ngOnInit(): void {
    this.userServices.getLstCategories().subscribe((res) => {
      this.lstCategories = res; 
    });
    this.authServices.userLoginEmitter.subscribe((user) =>
      {
        this.userLogin = user;
        this.countUnreadNoti = this.countUnreadNotifications();
        if(this.countUnreadNoti > 0){
          this.toastr.info(`Bạn có ${this.countUnreadNoti} thông báo chưa đọc`, "Thông báo")
        }
      }
    );
  }

  logOut(){
    this.authServices.clearUserLogged()
    this.toastr.info('Đã đăng xuất tài khoản', 'Thông báo');
    this.router.navigate(['login']);
  }

  countUnreadNotifications() {
    const unreadNotifications = this.userLogin.notification.filter((notification : any) => !notification.status_Notification);
    return unreadNotifications.length;
  }
}
