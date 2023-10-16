import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {


  @Input() codeProductItem : any
  // @Input() categoryName : String = "";


  constructor(){}
  ngOnInit(): void {
    
  }
}
