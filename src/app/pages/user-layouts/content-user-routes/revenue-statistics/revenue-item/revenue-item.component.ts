import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-revenue-item',
  templateUrl: './revenue-item.component.html',
  styleUrls: ['./revenue-item.component.css']
})
export class RevenueItemComponent {
  @Input() revenueItem : any;
  constructor(){}


}
