import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buktibayar',
  templateUrl: './buktibayar.component.html',
  styleUrls: ['./buktibayar.component.scss'],
})
export class BuktibayarComponent implements OnInit {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'hidden'; // Change initial state to 'hidden'
  animationCompleted = false;
  isBillAktif: boolean = true;
  idpel: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idpel = params['idpel'] || '';
      console.log('IDPEL:', this.idpel);
    });
  }

  toggleImageAnimation() {
    this.animationState = this.animationState === 'initial' ? 'up' : 'initial';
    this.fadeOutState = this.fadeOutState === 'initial' ? 'fadeOut' : 'initial';
    this.fadeInState = this.fadeInState === 'hidden' ? 'fadeIn' : 'hidden';
  }

  animationDone() {
    this.animationCompleted = true;
  }
  getCurrentDateTime(): Date {
    return new Date();
  }

  generateRandomReference(): string {
    const length = 15; // Adjust the length of the reference number as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
