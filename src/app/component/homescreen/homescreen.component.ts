import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { imageAnimation, fadeIn, fadeOut } from 'src/app/services/teman.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss'],
  animations: [imageAnimation, fadeOut, fadeIn],
})

export class HomescreenComponent {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  constructor(private router: Router, public loginService: LoginService) {}
  showSaldo: boolean = false;
  saldo: number = 123456;

  toggleSaldo() {
    this.showSaldo = !this.showSaldo;
  }

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
}