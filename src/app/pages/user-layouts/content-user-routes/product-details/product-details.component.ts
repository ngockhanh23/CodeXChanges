import { AuthServices } from 'src/services/authentication-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from 'src/services/users-services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from 'src/services/dialog';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  codeProd: any;
  userLogin: any;
  transactionUserCheck: boolean = false;

  selectedStars = 0;
  ratingAverages = 0;
  notiRating = "";
  lstRelatedProduct: any;


  constructor(private authServices: AuthServices, private userServices: UserServices, private route: ActivatedRoute, public dialog: MatDialog, private dialogService: DialogService, private router: Router) { }
  ngOnInit(): void {

    this.authServices.clearAdminAccountLogged();


    this.route.params.subscribe(() => {
      let idCodeProd = this.route.snapshot.params['id'];


      this.userLogin = this.authServices.userLoginExisting;
      this.authServices.userLoginEmitter.subscribe((user) => {
        this.userLogin = user;
        this.setTransactionUserStatus();
      });





      this.userServices.getCodeProductById(idCodeProd).subscribe((res) => {
        this.codeProd = res;
        // this.codeProd.comments.reverse();
        this.updateCommentList();

        this.ratingAverages = this.getRatingAverages();

        this.userServices.getAllCodeProducts().subscribe((res) => {
          this.lstRelatedProduct = res.filter((prod: any) => prod.category._id === this.codeProd.category._id && prod._id !== this.codeProd._id);
        });

        this.setTransactionUserStatus();


        this.userServices.updateNumberOfView(this.codeProd).subscribe((res) => { })
      });
      window.scrollTo(0, 0);
      // console.log(this.userLogin)
    });
  }


  //download button event
  onDownloadCodeProductClick() {

    if (this.authServices.userLoginExisting == null) {
      this.router.navigate(['/login']);
      return;
    }


    if (this.transactionUserCheck ===true || this.codeProd.user_Upload._id === this.userLogin._id) {
      this.downloadLinkDialogShow();
      return;
    }
    if (this.userLogin.coin_Balance < this.codeProd.download_Price) {
      this.confirmRechargeDialog()
      // console.log(res)

    }
    else {
      this.confirmProductPurchareDialog()
      // console.log(res)

    }

    // this.confirmRechargeDialog()

  }


  //confirm purchare
  confirmProductPurchareDialog(): void {
    const messageConfirm = 'Bạn có chắc chắn muốn dùng ' + this.codeProd.download_Price + ' xu trong tài khoản của mình để download source code này không ?'
    this.dialogService.openConfirmationDialog(messageConfirm, "Hủy", " Ok").afterClosed().subscribe((result) => {
      if (result) {
        //confirm download
        const transaction = {
          seller: this.codeProd.user_Upload._id,
          buyer: this.userLogin._id,
          code_Product: this.codeProd._id,
          price: this.codeProd.download_Price,
          net_Revenue : Math.floor(this.codeProd.download_Price *0.7),
          trading_Date: new Date()
        }

        this.userServices.createTransaction(transaction).subscribe((res) => {

          // this.authServices.setCoinBalanceUser(this.userLogin.coin_Balance - this.codeProd.download_Price)
          

          // // const idProd = this.codeProd
          // this.userServices.updateNumberOfDownload(this.codeProd).subscribe((res) => {
          //   console.log(res)
          // })

          this.authServices.getUserById(this.userLogin._id).subscribe((res) =>{
            this.authServices.setUserLogged(res);
            this.userServices.updateNumberOfDownload(this.codeProd).subscribe((res) => {});
            this.downloadLinkDialogShow()


          });

        });
      } else {
        // console.log('Từ chối');
      }
    });
  }

  confirmRechargeDialog(): void {
    const missingAmount = this.codeProd.download_Price - this.userLogin.coin_Balance;

    const messageConfirm = 'Số xu trong tài khoản bạn không đủ để mở khóa tải xuống, bạn còn thiếu ' + missingAmount + ' xu để mở khóa download, bạn có muốn nạp vip thêm không ?'
    this.dialogService.openConfirmationDialog(messageConfirm, "Không", " Nạp ngay").afterClosed().subscribe(result => {
      if (result) {
        // Xử lý khi người dùng chọn "Có"
        console.log('Xác nhận');
      } else {
        // Xử lý khi người dùng chọn "Không"
        console.log('Từ chối');
      }
    });
  }



  downloadLinkDialogShow() {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {

      data: { download_Link: this.codeProd.download_Link }
    });

    dialogRef.afterClosed();
  }

  setTransactionUserStatus() {

    const inforBuyerProductCheck = {
      buyer: this.userLogin._id,
      code_Product: this.codeProd._id
    }

    // console.log(this.userLogin._id)

    this.userServices.getTransactionByProductAndBuyer(inforBuyerProductCheck).subscribe((res) => {
      if (res) {
        this.transactionUserCheck = true
        console.log(this.transactionUserCheck)
      }
    }, (error) => {
      this.transactionUserCheck = false
      console.log(this.transactionUserCheck)

    })


  }


  rate(star: number) {
    this.selectedStars = star;

  }
  hoverStar(star: number) {

  }

  clearRate() {
    this.selectedStars = 0;
  }

  getRatingAverages() {
    if (this.codeProd.comments.length === 0) {
      return 0;
    }

    const totalRating = this.codeProd.comments.reduce((sum: any, comment: any) => sum + comment.rating_Starts, 0);
    const averageRating = totalRating / this.codeProd.comments.length;

    return averageRating;

  }

  sendRating(form: NgForm) {
    if (!this.userLogin) {
      this.router.navigate(['/login']);
    }
    if (!this.transactionUserCheck) {
      this.dialogService.openConfirmationDialog("Bạn chưa mua source code này xài thử nên bạn không có tư cách để đánh giá, muốn mua không ?", "Không", "Mua ngay").afterClosed().subscribe((result) => {
        if (result) {
          this.confirmProductPurchareDialog();
        }

      });
      return;
    }
    if (this.selectedStars === 0) {
      this.notiRating = "Bạn chưa chọn đánh giá";
      return;
    }

    const findCommentUserLoggin = this.codeProd.comments.find((comment: any) => comment.user_Comment._id === this.userLogin._id);
    console.log(findCommentUserLoggin)
    if (findCommentUserLoggin) {
      this.dialogService.openConfirmationDialog("Bạn đã đánh giá source code này trước đó, cập nhật đánh giá ?", "Hủy", "Cập nhật").afterClosed().subscribe((result) => {
        if (result) {             

          this.userServices.delteteComment(findCommentUserLoggin._id).subscribe((res) => {
            this.updateCommentList();
          this.postComment(form);  

          }, (error) => {console.log(error.message)});


        }
        return;
        
      });
      return
    }
    this.postComment(form);  
    
    
    
  }

  //post comment
  postComment(form: NgForm) {
    const comment = {
      user_Comment: this.userLogin._id,
      id_Code_Product: this.codeProd._id,
      rating_Starts: this.selectedStars,
      comment_Content: form.value.commentContent
    };
    // console.log(comment);
    this.userServices.postComment(comment).subscribe((res) => {

      this.updateCommentList();


      this.selectedStars = 0;
      form.value.commentContent = "";

    }, (error) => {
      console.log(error.message);
    });
  }

  deleteComment(idCmt: String) {
    this.dialogService.openConfirmationDialog("Bạn có chắc chắn muốn xóa đánh giá của bạn ?", "Hủy", "Xóa").afterClosed().subscribe((result) => {
      if (result) {
        this.userServices.delteteComment(idCmt).subscribe((res) => {

          this.updateCommentList();

        },(error) => {console.log(error.message)});
        // this.codeProd.comments = this.codeProd.comments.filter((comment: any) => comment._id !== idCmt);

      }

    });
  }

  updateCommentList() {
    //update comment list
    this.userServices.getCommentsListByProdId(this.codeProd._id).subscribe((res) => {
      this.codeProd.comments = res.reverse();
      // Tìm vị trí của comment có _id trùng với _id của userLogin trong mảng
      const index = this.codeProd.comments.findIndex((comment: any) => comment.user_Comment._id === this.userLogin._id);
      // console.log(index);

      if (index !== -1) {
        // Sử dụng splice để đẩy đối tượng lên đầu mảng
        const commentToMove = this.codeProd.comments.splice(index, 1)[0];
        this.codeProd.comments.unshift(commentToMove);
      }


    }, (error) => {
      console.log(error.message)
    });

  }

}
