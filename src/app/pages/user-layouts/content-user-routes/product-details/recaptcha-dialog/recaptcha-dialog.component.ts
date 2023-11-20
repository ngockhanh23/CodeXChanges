import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthServices } from 'src/services/authentication-service';
import { UserServices } from 'src/services/users-services';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';

@Component({
  selector: 'app-recaptcha-dialog',
  templateUrl: './recaptcha-dialog.component.html',
  styleUrls: ['./recaptcha-dialog.component.css']
})
export class RecaptchaDialogComponent implements OnInit{

  protected aFormGroup: FormGroup = new FormGroup({});
  siteKey : string = "6LffLxYpAAAAAIemDGCBQd2P9C-BNlV4TEcKemA7";
  userLogin: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<RecaptchaDialogComponent>, private formBuilder: FormBuilder,

    private userServices : UserServices,
    private authServices : AuthServices,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userLogin = this.authServices.userLoginExisting;

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }


  handleReset(): void {

  }


  handleExpire(): void {

  }

  // Xử lý sự kiện khi captcha được load
  handleLoad(): void {
  
  }

  // Xử lý sự kiện khi captcha được giải quyết thành công
  handleSuccess(event: any): void {
    // const response: string = event.response;
    // console.log('Captcha resolved:', response);
    // alert("hahaha");
    console.log(this.data.transaction)

    

    this.userServices.createTransaction(this.data.transaction).subscribe((res) => {
          this.authServices.getUserById(this.userLogin._id).subscribe((res) =>{
            this.authServices.setUserLogged(res);

          });

        });

    // this.authServices.getUserById(this.userLogin._id).subscribe((res) =>{
    //           this.authServices.setUserLogged(res);
 
    // });
    
    
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000); 
    setTimeout(() => {
      this.downloadLinkDialogShow()
    }, 1000); 
    
  
    
  }

  downloadLinkDialogShow() {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {

      data: { download_Link: this.data.downloadLink }
    });

    dialogRef.afterClosed();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
