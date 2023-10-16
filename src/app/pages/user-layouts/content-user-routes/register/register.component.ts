import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  warningMessage: String = "";

  constructor(private authServices: AuthServices, private toastr: ToastrService, private router : Router) { }
  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();

  }

  onRegister(form: NgForm) {
    const account = {
      name: form.value.userName.toString(),
      email: form.value.email.toString(),
      password: form.value.password.toString(),
      avatar_Url: "assets/img/default-avatar.png"
    };

    console.log(account)
    if( form.value.userName === "" || form.value.email === "" || form.value.password === "" ||form.value.rePassword === ""){
      this.warningMessage = "Vui lòng điền đầy đủ thông tin";
      this.toastr.error('Vui lòng điền đầy đủ thông tin', 'Đăng ký thất bại !');
      return
    }

    if (account.password != form.value.rePassword) {
      this.warningMessage = "Mật khẩu xác thực không chính xác";
      this.toastr.error('Mật khẩu xác thực không chính xác', 'Đăng ký thất bại !');
      return;
    }

    this.authServices.registerAccount(account).subscribe((res) => {
      // console.log(res)
      
        this.toastr.success('Hãy đăng nhập để mua hoặc bắt đầu đăng bán source code của bạn', 'Đăng ký thành công');
        this.router.navigate(['/login']);

    },(error) =>{
      this.toastr.error('Đã có người sử dụng email này', 'Đăng ký thất bại !');

    })
   

  }
}
