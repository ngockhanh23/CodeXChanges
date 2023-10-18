import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-upload-item',
  templateUrl: './product-upload-item.component.html',
  styleUrls: ['./product-upload-item.component.css']
})
export class ProductUploadItemComponent implements OnInit{
  @Input() prodUploadedItem : any;

  constructor(){}
  ngOnInit(): void {
    
  }

  navigateCodeProductDetails(id : String) {
    // alert(id)
  }
}
