import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summarypln',
  templateUrl: './summarypln.component.html',
  styleUrls: ['./summarypln.component.scss']
})
export class SummaryplnComponent implements OnInit {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;
  isBillAktif: boolean = true;
  idpel: string = '';
  password: string = '';
  rekening: string = '';
  submitted: boolean = false;   // Add a property to store the password

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idpel = params['idpel'] || '';
      this.rekening = params['rekening'] || '';
    });
  }

  onConfirmButtonClicked() {
    this.submitted = true;  // Set submitted to true when the form is submitted

    if (this.idpel && this.password) {
      // Perform actions when both idpel and password are present
      this.router.navigate(['/buktibayar', { idpel: this.idpel }]);
    } else {
      // Handle the case when either idpel or password is missing
      console.log('Please fill in both IDPEL and Password.');
    }
  }

  onSwitchButtonClick(isBillAktif: boolean) {
    this.isBillAktif = isBillAktif;
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
