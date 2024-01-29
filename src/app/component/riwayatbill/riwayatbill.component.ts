import { Component } from '@angular/core';

@Component({
  selector: 'app-riwayatbill',
  templateUrl: './riwayatbill.component.html',
  styleUrls: ['./riwayatbill.component.scss']
})
export class RiwayatbillComponent {
  showDetailBill: boolean = false;
  selectedItemIndex: number | null = null; // New property to track selected item
  imagePaths: string[] = [
    '../../../assets/karakter/gambar_4.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_3.svg',
    '../../../assets/karakter/gambar_1.svg',
    '../../../assets/karakter/gambar_2.svg',
  ];

  toggleDetailBill(index: number) {
    this.showDetailBill = !this.showDetailBill;
    this.selectedItemIndex = this.selectedItemIndex === index ? null : index;
    console.log("sudah diklik");
  }
}
