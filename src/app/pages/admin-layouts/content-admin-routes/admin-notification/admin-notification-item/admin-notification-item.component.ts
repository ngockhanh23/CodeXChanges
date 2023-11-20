import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from 'src/services/admin-services';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-notification-item',
  templateUrl: './admin-notification-item.component.html',
  styleUrls: ['./admin-notification-item.component.css']
})
export class AdminNotificationItemComponent implements OnInit{

  @Input() adminNotificationItem : any
  adminLogged : any;

  constructor(private router: Router,private adminServices : AdminServices,private authServices: AuthServices,){}
  ngOnInit(): void {
    this.adminLogged = this.authServices.adminLoginExisting;    
    
  }
  navigateNotification(notification: any){
    if(!notification.status_Notification){
      const notiUser = {
        idNotification : notification._id
      }
      this.adminServices.updateStatusNotificationAdmin(notiUser).subscribe((res) => {
        this.notificationNavigateHandle(notification.type_Notification, notification.interactive_Item_Id);

    
          // this.authServices.setAdminLogged(res);
          this.adminServices.getAdminAccountById(this.adminLogged._id).subscribe((res) => {
            this.authServices.setAdminLogged(res);
          }, (error) => {console.log(error.message)});
     

      }, (error) => {console.log(error.message)})
      // console.log('haha')
      return;
    }
    this.notificationNavigateHandle(notification.type_Notification, notification.interactive_Item_Id);
    console.log(notification)

  }

  notificationNavigateHandle(typeNotification : Number, interactive_Item_Id: String){
    switch(typeNotification){
      case 1  : this.router.navigate(['/detail-code-prod-admin', interactive_Item_Id]); break;
      // case 2  : this.router.navigate(['/get-users-bought-product-list']); break;
      case 3  : this.router.navigate(['/admin-deposit-list']); break;
      case 4  : this.router.navigate(['/admin-withdrawal-details', interactive_Item_Id]); break;



    }
  }
}
