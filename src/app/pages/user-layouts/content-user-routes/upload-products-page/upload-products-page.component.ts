import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, OnInit, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from 'src/services/users-services';

@Component({
  selector: 'app-upload-products-page',
  templateUrl: './upload-products-page.component.html',
  styleUrls: ['./upload-products-page.component.css']
})
export class UploadProductsPageComponent implements OnInit {
  userLogin: any;
  form: FormGroup;
  submitted = false;

  avatarImageUrl: string = "assets/img/no-image-icon-6.png";
  avatarImgFile: any;
  avatarUrlUploaded = "";
  lstProductImgsUploaded : String [] = [];
  lstProductImgs: any;

  lstCategoriesOptions: any;

  imagesProductUrl: string[] = [];
  price_Download_Input = 0;
  isCommitmentToSupport = false;

  uploading: boolean = false;

  @ViewChild('successModal', { static: false }) successModal!: ElementRef;

  @ViewChildren('inputField') inputFields: QueryList<ElementRef>;

  constructor(private fb: FormBuilder, private authServices: AuthServices, private router: Router, private toastr: ToastrService, private fireStorage: AngularFireStorage, private userServices: UserServices) {
    this.form = this.fb.group({
      avatarUrl: ['', Validators.required],
      prodTitle: ['', Validators.required],
      downloadLink: ['', Validators.required],
      category: ['', Validators.required],
      prodDescription: ['', Validators.required],
      downloadPrice: [0, Validators.required],
      installInstruction: ['', Validators.required],
      demoVideoLink: [''],
      commitmentToSupport: [false],
      demoImgages: [''],
      isAgreeToTerms: [false, Validators.required]
    });
    this.inputFields = new QueryList<ElementRef>();
    
  }
  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();
    //check login user
    this.userLogin = this.authServices.userLoginExisting;
    this.authServices.userLoginEmitter.subscribe((user) => {
      this.userLogin = user;
    });

    if (!this.userLogin) {
      this.router.navigate(['/login']);
    };

    this.userServices.getLstCategories().subscribe((res) => {
      this.lstCategoriesOptions = res;
    });

  }

  async submitForm() {
    this.submitted = true;
    if (this.form.valid) {
      const formData = this.form.value;
      if (!formData.commitmentToSupport && formData.downloadPrice >= 100) {
        return;
      }

      await Promise.all([this.uploadProductImages()]);
      if(this.lstProductImgs){
        await Promise.all([this.uploadProductImagesList()]);
      }    

      // await Promise.all([this.uploadProductImages(), this.uploadProductImagesList()]);

      //data code prod
      const dataCodeProdUpload = {
        code_Title: formData.prodTitle,
        code_Description: formData.prodDescription,
        avatar_Url: this.avatarUrlUploaded,
        install_Instruction: formData.installInstruction,
        download_Price: formData.downloadPrice,
        demo_Video_Link: formData.demoVideoLink,
        download_Link: formData.downloadLink,
        number_Of_Download: 0,
        number_Of_View: 0,
        status: "Chờ duyệt",
        product_Group : this.getCodeGroupByPrice(formData.downloadPrice),
        images : this.lstProductImgsUploaded,
        category : formData.category,
        user_Upload : this.userLogin._id
      }

      this.userServices.uploadCodeProduct(dataCodeProdUpload).subscribe((res) =>{
        // console.log(res);

        this.authServices.getUserById(this.userLogin._id).subscribe((res) =>{
          this.authServices.setUserLogged(res);

        });

        this.uploading = false;
        this.form.reset();
        this.openModal();
      })

      
    } else {
      // upload is failed
      const firstInvalidField = document.querySelector('.ng-invalid');

      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth' });
        this.toastr.error("Thêm không thành công", "Lỗi")
      }
    }
  }



  async uploadProductImagesList() {

    for (const imgFile of this.lstProductImgs) {
      this.uploading = true
      if (imgFile) {
        const currentTime = new Date();
        const filePath = `${this.userLogin._id}/code-products/${currentTime.getTime()}${imgFile.name}`;

        const storageRef = this.fireStorage.ref(filePath);
        const uploadTask = storageRef.put(imgFile);

        // Sử dụng Promise để chờ việc tải lên hoàn thành
        const snapshot = await uploadTask;

        if (snapshot.state === 'success') {
          storageRef.getDownloadURL().subscribe(downloadURL => {
          // this.uploading = false;
            this.lstProductImgsUploaded.push(downloadURL)
          });
        }
      }
    }
    
  }

 
  async uploadProductImages(){
    if (this.avatarImageUrl) {
      this.uploading = true;
      const currentTime = new Date();
      const filePath = `${this.userLogin._id}/code-products/${currentTime.getTime()}${this.avatarImgFile.name}`;

      const storageRef = this.fireStorage.ref(filePath);
      const uploadTask = storageRef.put(this.avatarImgFile);

      uploadTask.snapshotChanges().subscribe((snapshot: any) => {
        if (snapshot.state === 'success') {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            console.log('URL ảnh:', downloadURL);
            this.avatarUrlUploaded = downloadURL;
            // this.uploading = false
            // return true
          });
        }
      });
    }
  }




  // async uploadProductImages(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     if (this.avatarImageUrl) {
  //       this.uploading = true;
  //       const currentTime = new Date();
  //       const filePath = `${this.userLogin._id}/code-products/${currentTime.getTime()}${this.avatarImgFile.name}`;
  
  //       const storageRef = this.fireStorage.ref(filePath);
  //       const uploadTask = storageRef.put(this.avatarImgFile);
  
  //       uploadTask.snapshotChanges().subscribe((snapshot: any) => {
  //         if (snapshot.state === 'success') {
  //           storageRef.getDownloadURL().subscribe(downloadURL => {
  //             console.log('URL ảnh:', downloadURL);
  //             this.avatarUrlUploaded = downloadURL;
  //             this.uploading = false;
  //             resolve(null); // Đánh dấu hàm đã hoàn tất thành công.
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

  getCodeGroupByPrice(price : number){
    if(price === 0 || price < 0)
      return "Code miễn phí"
    else if(price >= 1 && price <= 99)
      return "Code tham khảo"
    else if(price >= 100)
      return "Code chất lượng"
    else 
      return "Code tham khảo"
  }

  onSelectPriceChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.form.get('downloadPrice')?.setValue(selectedValue);
    this.price_Download_Input = parseInt(selectedValue);


    console.log("Selected value: " + selectedValue);
  }


  onAvatarImageSelected(event: any) {
    this.avatarImgFile = event.target.files[0];
    if (this.avatarImgFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.avatarImgFile);
    }
  }

  onPictureProductDemoSelected(event: any) {
    this.lstProductImgs = event.target.files;
    if (this.lstProductImgs && this.lstProductImgs.length > 0) {
      // check the number of pictures
      if (this.lstProductImgs.length + this.imagesProductUrl.length > 5) {

        this.toastr.error("Số lượng ảnh không được vượt quá 5 ảnh")
        return;
      }

      for (let i = 0; i < this.lstProductImgs.length; i++) {
        const file: File = this.lstProductImgs[i];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagesProductUrl.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

 

  
  openModal() {
    this.successModal!.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.successModal!.nativeElement.style.display = 'none';
  }
  


  clearImgProdList() {
    this.lstProductImgs = null;
    this.imagesProductUrl = [];
    // console.log(this.lstProductImgs)
  }
  getProductsUploaded(){
    this.closeModal();
    this.router.navigate(['/get-products-upload-user']);
  }


}
