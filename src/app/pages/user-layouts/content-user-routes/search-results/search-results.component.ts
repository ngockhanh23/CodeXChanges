import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { UserServices } from 'src/services/users-services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit{

  searchKey = "";
  lstCodeProds : any;
  allCodeProductResults = [];
  constructor(private authServices : AuthServices,private router: Router,private userServices: UserServices, private route: ActivatedRoute){};
  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();

    this.route.params.subscribe(() => {
      this.searchKey = this.route.snapshot.params['search-key'];
      this.userServices.getApprovedProductList().subscribe((res) => {
        // this.allCodeProductResults = res;
        this.lstCodeProds = res.filter((prod: any) => prod.code_Title.toLowerCase().includes(this.searchKey.toLowerCase()));
        this.allCodeProductResults = this.lstCodeProds;

      })
    });
    // this.lstCodeProds = this.getLstProdBySearchKey();
  }

  sortProductByTime(){
    
    this.lstCodeProds = this.allCodeProductResults.sort((a:any, b:any) => {
      const dateA = new Date(a.upload_Date);
      const dateB = new Date(b.upload_Date);
      return dateB.getTime() - dateA.getTime();
    });

  }

  sortProductByDownloadCount(){
    this.lstCodeProds = this.allCodeProductResults.sort((a: any, b: any) => {
      return b.number_Of_Download - a.number_Of_Download;
    });
  }

  sortProductByNumberOfView(){
    this.lstCodeProds = this.allCodeProductResults.sort((a: any, b: any) => {
      return b.number_Of_View - a.number_Of_View;
    });
  }

  
  
}
