// pembayaran.component.ts
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-pembayaran',
  templateUrl: './pembayaran.component.html',
  styleUrls: ['./pembayaran.component.scss'],
  animations: [
    trigger('imageAnimation', [
      state('initial', style({ transform: 'translateY(0%)' })),
      state('up', style({ transform: 'translateY(80%)' })),
      transition('initial => up', animate('0.5s ease-out')),
      // transition('up => initial', animate('0.5s ease-out')),
    ]),
    trigger('fadeOut', [
      state('initial', style({ opacity: 1 })),
      state('fadeOut', style({ opacity: 0 })),
      transition('initial => fadeOut', animate('0.5s')),
      transition('fadeOut => initial', animate('2s')),
    ]),
    trigger('fadeIn', [
      state('initial', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('initial => fadeIn', animate('1s')),
      transition('fadeIn => initial', animate('1.5s')),
    ])
  ],
})

export class PembayaranComponent{

  isNotificationVisible = false;
  notificationTimeout: any;
  isNotification: boolean = false;

  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  ngOnInit() {
    // You can keep ngOnInit empty or add any other initialization logic here
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

  constructor(private cdr: ChangeDetectorRef) {}

  isPopupVisible = false;
  isSwitchActive = false;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
    // Uncomment the following line if you want the switch to be toggled when the popup is shown
    // this.toggleSwitch();
  }

  toggleSwitch(): void {
    // Toggle the switch state
    this.isSwitchActive = !this.isSwitchActive;

    // Close the popup when the switch is turned on
    if (this.isSwitchActive) {
      this.isPopupVisible = false;
      // Show notification immediately when switch is turned on
      this.showNotification();
    }
    
  }

  closeNotification(shouldActivate: boolean): void {
  
    // Handle the result from the notification
    console.log('Notification Result:', shouldActivate);
  
    // Perform additional actions based on the user's choice
    if (shouldActivate) {
      // Implement logic to activate the system
      // For example, you can make an API call or perform other actions
      this.isSwitchActive = true;
      // this.isNotification = true;
      console.log('Activating the system...');
      this.cdr.detectChanges();
  
      // Tampilkan notifikasi
      this.showNotification();
      console.log("notifnya jalan")
      
      // Setelah 3 detik, sembunyikan notifikasi
      this.notificationTimeout = setTimeout(() => {
        this.hideNotification();
      }, 4000);
    } else if (this.isSwitchActive) {
      this.isSwitchActive = false;
    }
  
    // Close the popup
    this.togglePopup();
  }
  
  showNotification(): void {
    this.isNotificationVisible = true;
  }
  
  hideNotification(): void {
    this.isNotificationVisible = false;
    clearTimeout(this.notificationTimeout);
  }
}