// editbill.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';  // Import FormGroup dan FormBuilder
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-editbill',
  templateUrl: './editbill.component.html',
  styleUrls: ['./editbill.component.scss'],
  providers: [DataService],
  animations: [
    trigger('imageAnimation', [
      state('initial', style({ transform: 'translateY(0)' })),
      state('up', style({ transform: 'translateY(-100%)' })),
      transition('initial => up', animate('7s ease-out')),
    ]),
    trigger('fadeOut', [
      state('initial', style({ opacity: 1 })),
      state('fadeOut', style({ opacity: 0 })),
      transition('initial => fadeOut', animate('2s')),
      transition('fadeOut => initial', animate('2s')),
    ]),
    trigger('fadeIn', [
      state('initial', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('initial => fadeIn', animate('0.5s')),
      transition('fadeIn => initial', animate('0.5s')),
    ]),
    trigger('popupAnimation', [
      state('hidden', style({ transform: 'translateY(100%)' })),
      state('visible', style({ transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.5s ease-in')),
      transition('visible => hidden', animate('0.5s ease-out'))
    ])
  ],
})
export class EditbillComponent implements OnInit {
  // items: any[] = [];
  items: { itemName: string; quantity: number; price: number }[] = [];
  originalItemIndex: number;
  editedItem: { itemName: string, quantity: number, price: number };
  editForm: FormGroup;  // Inisialisasi FormGroup

  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  constructor(private fb: FormBuilder, public dataService: DataService, private route: ActivatedRoute) {
    this.originalItemIndex = 0;
    this.editedItem = { itemName: '', quantity: 0, price: 0 };

    // Inisialisasi formulir reaktif dengan FormGroup dan FormControls
    this.editForm = this.fb.group({
      itemName: [''],
      quantity: [0],
      price: [0]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.items = this.dataService.getData();
      this.originalItemIndex = +params['index'];
  
      if (this.items && this.items.length > this.originalItemIndex) {
        const originalItem = this.items[this.originalItemIndex];
  
        // Update the form values directly without using setValue
        if (originalItem) {
          this.editForm.controls['itemName'].setValue(originalItem.itemName);
          this.editForm.controls['quantity'].setValue(originalItem.quantity);
          this.editForm.controls['price'].setValue(originalItem.price);
        } else {
          console.error('Original item is undefined or null.');
        }
      } else {
        console.error('Items array is undefined or empty.');
      }
    });
  }
    

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
    this.animationState = (this.animationState === 'initial') ? 'up' : 'initial';
    this.fadeOutState = (this.fadeOutState === 'initial') ? 'fadeOut' : 'initial';
    this.fadeInState = (this.fadeInState === 'initial') ? 'fadeIn' : 'initial';
  }

  saveChanges() {
    console.log('Original Item:', this.dataService.getData()[this.originalItemIndex]);
    console.log('Edited Item:', this.editForm.value);

    // Update data di layanan
    this.dataService.updateData(this.originalItemIndex, this.editForm.value);

    // Tambahkan logika tambahan untuk memperbarui data atau melakukan panggilan API
  }
}
