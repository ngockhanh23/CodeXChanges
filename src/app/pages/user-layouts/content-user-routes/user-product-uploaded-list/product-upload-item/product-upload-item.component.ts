import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-upload-item',
  templateUrl: './product-upload-item.component.html',
  styleUrls: ['./product-upload-item.component.css']
})
export class ProductUploadItemComponent implements OnInit{
  @Input() prodUploadedItem : any;

  constructor(private router : Router){}
  ngOnInit(): void {
    
  }

  navigateCodeProductDetails(id : String) {
    // alert(id)
    if(this.prodUploadedItem.status ==="Đã duyệt"){
      this.router.navigate(['/details', id])
    }
  }
}
