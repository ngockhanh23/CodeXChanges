import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // email : String ="";
  // password : String = "";
  warningMessage : String = "";
  constructor(private authServices : AuthServices,private router: Router, private toastr: ToastrService){};
  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();
  }
  
  onLogin(form: NgForm){
    const acount = {
      email: form.value.email,
      password : form.value.password
    }

    this.authServices.loginUser(acount).subscribe((res) => {
      
      if(res._id == null){
      this.toastr.error('Tài khoản hoặc mật khẩu không chính xác', 'Đăng nhập thất bại');

        this.warningMessage = "Tài khoản hoặc mật khẩu không chính xác"
        return      
      }

      if(res.role == "admin"){
        this.authServices.getAdminAccountById(res._id).subscribe((res) => {
          this.authServices.setAdminLogged(res);
          this.router.navigate(['admin-home']);

          return
        });
      }
      
      this.authServices.getUserById(res._id).subscribe((res) =>{


        this.authServices.setUserLogged(res);

      })
      this.toastr.success('Đăng nhập thành công!', 'Thông báo');

      this.router.navigate([''])
    });
  }
}
