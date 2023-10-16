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

  constructor( private authServices: AuthServices, private userServices: UserServices, private route: ActivatedRoute){}
  ngOnInit(): void {

    this.authServices.clearAdminAccountLogged();


    this.route.params.subscribe(() => {
      let idCate = this.route.snapshot.params['id'];

      this.userServices.getCategoryByID(idCate).subscribe(
        (res) => {
          this.category = res
        },
        (error) => {
          console.error(error);
        }
      );
    })
  }
  
}
