import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-hasilscan',
  templateUrl: './hasilscan.component.html',
  styleUrls: ['./hasilscan.component.scss'],
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
export class HasilscanComponent implements OnInit {
  data: { itemName: string, quantity: number, price: number }[];
  editForm: FormGroup;

  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.data = this.dataService.getData();
    this.editForm = this.fb.group({
      itemName: [''],
      quantity: [''],
      price: [''],
    });
  }

  ngOnInit() {
    // Jika Anda ingin mengisi formulir dengan data sebelumnya, misalnya data pertama dari layanan
    const firstItem = this.data[0];
    this.editForm.patchValue(firstItem);
  }

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
    this.animationState = (this.animationState === 'initial') ? 'up' : 'initial';
    this.fadeOutState = (this.fadeOutState === 'initial') ? 'fadeOut' : 'initial';
    this.fadeInState = (this.fadeInState === 'initial') ? 'fadeIn' : 'initial';
  }

  // Tambahkan fungsi lain yang Anda perlukan
}
