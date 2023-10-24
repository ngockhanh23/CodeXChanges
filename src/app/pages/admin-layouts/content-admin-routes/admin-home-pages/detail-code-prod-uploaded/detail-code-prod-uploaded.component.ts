import { AuthServices } from 'src/services/authentication-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from 'src/services/users-services';
import { AdminServices } from 'src/services/admin-services';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-detail-code-prod-uploaded',
  templateUrl: './detail-code-prod-uploaded.component.html',
  styleUrls: ['./detail-code-prod-uploaded.component.css']
})
export class DetailCodeProdUploadedComponent implements OnInit{  
  codeProd: any;
  imgClickUrl : String = "";
  statusOption = "";

  constructor(private authServices: AuthServices, private userServices: UserServices, private route: ActivatedRoute, private router: Router, private adminServices : AdminServices, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    const loginExists = localStorage.getItem('account_id');    
    if (loginExists === null) {
      this.router.navigate(['/']);
    }
    this.route.params.subscribe(() => {
      let idCodeProd = this.route.snapshot.params['id'];
        // alert(idCodeProd)
        this.userServices.getCodeProductById(idCodeProd).subscribe((res) => {
            this.codeProd = res;
            this.statusOption = res.status;
            console.log(this.codeProd)
        });

    });
  }

  saveStatusCodeProd(){
    const censorshipPost = {
      id_Prod : this.codeProd._id,
      id_User : this.codeProd.user_Upload._id,
      status : this.statusOption
    }
    this.adminServices.saveCensorshipProd(censorshipPost).subscribe((res) => {
      this.codeProd = res;
      this.toastr.success("Lưu phê duyệt thành công","Hoàn tất");
    }, (error) => {
      this.toastr.error("Lưu phê duyệt không thành công", "Lỗi");
    });
    
  }

  showPictureClick(url : String){
    this.imgClickUrl = url;
  }
  clearPictureClick(){
    this.imgClickUrl = "";
  }

  
  
}
