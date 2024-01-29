// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {  
  tempat = 'IKKUDO ICHI - Central Park'
  tanggal = '13/01/2024'
  jam = ' 17:07 WIB'
  private data = [
    { itemName: 'Tori Karaage Curry', quantity: 1, price: 58000 },
    { itemName: 'Tori Katsu Oyakodon', quantity: 1, price: 75000 },
    { itemName: 'Tori Miso ( S )', quantity: 1, price: 53000 },
    { itemName: 'Tori Karaagemen ( S )', quantity: 1, price: 53000 },
    { itemName: 'Yaki Tori Gyoza', quantity: 1, price: 39000 },
    { itemName: 'Yaki Tori Ebi Iri Gyoza', quantity: 1, price: 39000 },
    { itemName: 'Ice ocha', quantity: 3, price: 42000 },
    { itemName: 'Sweet ice tea', quantity: 1, price: 15000 },
  ];

  private counts: { [id: string]: number } = {};

  getCount(id: string): number {
    return this.counts[id] || 1;
  }

  setCount(id: string, count: number): void {
    this.counts[id] = count;
  }

  getData() {
    return this.data;
  }

  updateData(index: number, newData: { itemName: string, quantity: number, price: number }) {
    if (index >= 0 && index < this.data.length) {
      this.data[index] = newData;
    } else {
      console.error('Invalid index for updateData');
    }
  }
}
