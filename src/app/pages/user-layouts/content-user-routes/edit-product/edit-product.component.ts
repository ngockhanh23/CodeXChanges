import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserServices } from 'src/services/users-services';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  @ViewChildren('inputField') inputFields: QueryList<ElementRef>;

  userLogin: any;
  form: FormGroup;
  submitted = false;
  lstCategoriesOptions: any;
  // price_Download_Input = 0;
  avatarImageUrl: string = "assets/img/no-image-icon-6.png";
  avatarImgFile: any;

  imagesProductUrl: string[] = [];
  lstProductImgs: any;


  codeProd : any;



  constructor(private fb: FormBuilder, private authServices: AuthServices, private router: Router, private toastr: ToastrService, private fireStorage: AngularFireStorage, private userServices: UserServices, private route: ActivatedRoute) {
    this.form = this.fb.group({
      // avatarUrl: ['', Validators.required],
      prodTitle: ['', Validators.required],
      downloadLink: ['', Validators.required],
      category: ['', Validators.required],
      prodDescription: ['', Validators.required],
      downloadPrice: [0, Validators.required],
      installInstruction: ['', Validators.required],
      demoVideoLink: [''],
      // commitmentToSupport: [false],
      // demoImgages: [''],
      // isAgreeToTerms: [false, Validators.required]
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

    this.route.params.subscribe(() => {
      let idCodeProd = this.route.snapshot.params['id'];
      this.userServices.getLstCategories().subscribe((res) => {
        this.lstCategoriesOptions = res;
      });

      // alert(idCodeProd)
      this.userServices.getCodeProductById(idCodeProd).subscribe((res) => {
        this.avatarImageUrl = res.avatar_Url;
        // this.codeProd = res
        this.imagesProductUrl = res.images
        this.form.patchValue({
          // avatarUrl: 'giá trị',
          prodTitle: res.code_Title,
          downloadLink : res.download_Link,
          category : res.category._id,
          prodDescription: res.code_Description,
          downloadPrice: res.download_Price,
          installInstruction : res.install_Instruction,
          demoVideoLink : res.demo_Video_Link
        })
        
      });
    });

    

    
  }

  submitForm(){
  this.submitted = true;

    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData)
   }
   else{
    const firstInvalidField = document.querySelector('.ng-invalid');

    if (firstInvalidField) {
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
      this.toastr.error("Thêm không thành công", "Lỗi")
    }
   }
  }
  onSelectPriceChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    // this.form.get('downloadPrice')?.setValue(selectedValue);
    this.form.patchValue({
      downloadPrice : parseInt(selectedValue)});
  
  
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
}




