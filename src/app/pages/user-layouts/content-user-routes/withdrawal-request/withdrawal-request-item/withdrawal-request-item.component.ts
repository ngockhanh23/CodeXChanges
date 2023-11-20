import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-withdrawal-request-item',
  templateUrl: './withdrawal-request-item.component.html',
  styleUrls: ['./withdrawal-request-item.component.css']
})
export class WithdrawalRequestItemComponent {
  @Input() withdrawalItem : any;
}
