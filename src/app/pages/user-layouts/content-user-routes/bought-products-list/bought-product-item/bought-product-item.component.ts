import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bought-product-item',
  templateUrl: './bought-product-item.component.html',
  styleUrls: ['./bought-product-item.component.css']
})
export class BoughtProductItemComponent implements OnInit{

  @Input() boughtProductItem : any
  constructor(){}
  ngOnInit(): void {
    
  }

 
}
