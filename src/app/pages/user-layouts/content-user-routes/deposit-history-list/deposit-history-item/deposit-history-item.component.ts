import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deposit-history-item',
  templateUrl: './deposit-history-item.component.html',
  styleUrls: ['./deposit-history-item.component.css']
})
export class DepositHistoryItemComponent {
  @Input() depositHistoryItem : any

}
