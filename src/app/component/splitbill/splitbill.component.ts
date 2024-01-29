// splitbill.component.ts
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Teman } from 'src/app/model/teman.model';
import { TemanService } from 'src/app/services/teman.service';

@Component({
  selector: 'app-splitbill',
  templateUrl: './splitbill.component.html',
  styleUrls: ['./splitbill.component.scss'],
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
export class SplitbillComponent {
  isBillAktif: boolean = true;
  isNotificationVisible = false;
  notificationTimeout: any;
  isNotification: boolean = false;
  isPopupVisible: boolean = false;
  popupAnimationState: string = 'hidden';

  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  showPopup = false;

  showConfirmation: boolean = false;
  showConfirmationNotification: boolean = false;


 
  imagePaths: string[] = [
    '../../../assets/karakter/gambar_4.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_3.svg',
    '../../../assets/karakter/gambar_1.svg',
    '../../../assets/karakter/gambar_2.svg',
  ];
  isSwitchActive: boolean[] = Array(this.imagePaths.length).fill(false);
  selectedFriendsToShow: Teman[] = [];

  constructor(private temanService: TemanService) {}

  ngOnInit() {
    // You can keep ngOnInit empty or add any other initialization logic here
    this.selectedFriendsToShow = this.temanService.getSelectedFriends();
  }

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
    this.animationState = (this.animationState === 'initial') ? 'up' : 'initial';
    this.fadeOutState = (this.fadeOutState === 'initial') ? 'fadeOut' : 'initial';
    this.fadeInState = (this.fadeInState === 'initial') ? 'fadeIn' : 'initial';
  }

  animationDone() {
    this.animationCompleted = true;
  }

  toggleSwitch(index: number) {
    // Toggle nilai boolean di dalam array sesuai dengan index gambar yang diklik
    this.isSwitchActive[index] = !this.isSwitchActive[index];
  }
  onSwitchButtonClick(isBillAktif: boolean) {
    this.isBillAktif = isBillAktif;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
    this.popupAnimationState = this.isPopupVisible ? 'visible' : 'hidden';
  }

  confirmCloseBill() {
    this.showConfirmationNotification = false;
    this.togglePopup(); // Close the popup or perform other actions
    // Additional logic for closing the bill
  }
  
  cancelCloseBill() {
    this.showConfirmationNotification = false;
  }
  
  openConfirmation() {
    this.showConfirmationNotification = true;
  }
  openPopup(): void {
    this.showPopup = true;
  }
  closePopup(): void {
    this.showPopup = false;
  }
}
