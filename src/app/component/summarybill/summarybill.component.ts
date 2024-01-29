import { Component } from '@angular/core';

@Component({
  selector: 'app-summarybill',
  templateUrl: './summarybill.component.html',
  styleUrls: ['./summarybill.component.scss']
})


export class SummarybillComponent {
  showDetailBill: boolean = false;

  toggleDetailBill() {
    this.showDetailBill = !this.showDetailBill;
    console.log("sudah diklik");
  }
}
