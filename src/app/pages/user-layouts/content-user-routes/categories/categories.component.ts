import { UserServices } from 'src/services/users-services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category:any;
  lstProdsByCate :any;

  constructor( private authServices: AuthServices, private userServices: UserServices, private route: ActivatedRoute){}
  ngOnInit(): void {

    this.authServices.clearAdminAccountLogged();


    this.route.params.subscribe(() => {
      let idCate = this.route.snapshot.params['id'];

      this.userServices.getCategoryByID(idCate).subscribe(
        (res) => {
          this.category = res;
          this.lstProdsByCate = this.category.codeProducts;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  sortProductByTime(){
    
    this.lstProdsByCate = this.category.codeProducts.sort((a:any, b:any) => {
      const dateA = new Date(a.upload_Date);
      const dateB = new Date(b.upload_Date);
      return dateB.getTime() - dateA.getTime();
    });

  }

  sortProductByDownloadCount(){
    this.lstProdsByCate = this.category.codeProducts.sort((a: any, b: any) => {
      return b.number_Of_Download - a.number_Of_Download;
    });
  }

  sortProductByNumberOfView(){
    this.lstProdsByCate = this.category.codeProducts.sort((a: any, b: any) => {
      return b.number_Of_View - a.number_Of_View;
    });
  }
  
}
