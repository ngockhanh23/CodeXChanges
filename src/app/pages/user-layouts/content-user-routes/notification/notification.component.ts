import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { UserServices } from 'src/services/users-services';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  userLogin: any;
  lstNotification : any;

  constructor(private userServices : UserServices, private authServices : AuthServices, private router : Router){}
  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();
    
    //check login user
    this.userLogin = this.authServices.getUserLoginExisting();

    if(!this.userLogin){
      this.router.navigate(['/login']);
    }
    this.authServices.userLoginEmitter.subscribe((user) => {
      this.userLogin = user;
      // this.lstNotification = this.userLogin.notification.reverse();

    });
    this.lstNotification = this.userLogin.notification;

    

  }

  notificationNavigate(notification: any){
    if(!notification.status_Notification){
      const notiUser = {
        idUser: this.userLogin._id,
        idNotification : notification._id
      }
      this.userServices.updateStatusNotificationUser(notiUser).subscribe((res) => {
        this.notificationNavigateHandle(notification.type_Notification);

        this.authServices.getUserById(this.userLogin._id).subscribe((res) => {
          this.authServices.setUserLogged(res);
        });

      }, (error) => {console.log(error.message)})
      // console.log('haha')
      return;
    }
    this.notificationNavigateHandle(notification.type_Notification);
    // console.log('vcl')


  }

  //handle navigate
  notificationNavigateHandle(typeNotification : Number){
    switch(typeNotification){
      case 1  : this.router.navigate(['/revenues']); break;
      case 2  : this.router.navigate(['/get-users-bought-product-list']); break;
      case 3  : this.router.navigate(['/get-products-upload-user']); break;
      // case 4  : this.router.navigate(['/revenues']); break;
      // case 5  : this.router.navigate(['/revenues']); break;
      // case 6  : this.router.navigate(['/revenues']); break;

    }
  }

}
