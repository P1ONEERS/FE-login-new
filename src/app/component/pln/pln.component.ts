import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router module

@Component({
  selector: 'app-pln',
  templateUrl: './pln.component.html',
  styleUrls: ['./pln.component.scss'],
  // ... animations and other metadata
})
export class PlnComponent implements OnInit {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  isBillAktif: boolean = true;
  inputIdPel: string = '';
  inputName: string = '';
  selectedFavoriteIdPel: string = '';
  submitted: boolean = false;
  isSaveToFavoritesChecked: boolean = false;
  selectedIdPel: string = '';
  selectedRekening: string = '';
  

  favoriteList: { idPel: string, name: string }[] = [
    { idPel: '123456', name: 'satu' },
    { idPel: '789012', name: 'dua' },
    // Add more favorites as needed
  ];

  onFavoriteSelected(favorite: { idPel: string, name: string }): void {
    this.selectedFavoriteIdPel = favorite.idPel;
  }
  
  isOptionSelected(): boolean {
    return this.selectedFavoriteIdPel !== null && this.selectedFavoriteIdPel !== '';
  }

  constructor(private router: Router) {}  // Inject the Router in the constructor

  onSwitchButtonClick(isBillAktif: boolean) {
    this.isBillAktif = isBillAktif;
  }


  onConfirmButtonClicked() {
    this.submitted = true;
  
    if (this.isBillAktif && this.selectedFavoriteIdPel !== '') {
      this.router.navigate(['/summarypln', { idpel: this.selectedFavoriteIdPel }]);
    } else if (this.isBillAktif && this.inputIdPel) {
      this.router.navigate(['/summarypln', { idpel: this.inputIdPel }]);  
    } else if (!this.isSaveToFavoritesChecked && this.inputIdPel) {
      this.router.navigate(['/summarypln', { idpel: this.inputIdPel }]);
    } else if (this.isSaveToFavoritesChecked && this.inputIdPel && this.inputName) {
      this.router.navigate(['/summarypln', { idpel: this.inputIdPel }]);
    }
  }
  
  // Metode untuk mendapatkan nilai idpel dari opsi yang dipilih di daftar favorit
  getSelectedIdPelFromFavorites(): string {
    // Anda perlu mengganti logika ini sesuai dengan bagaimana Anda mendapatkan nilai idpel dari opsi favorit.
    // Misalnya, jika Anda menyimpan nilai idpel favorit dalam properti di komponen, Anda dapat mengambilnya di sini.
    // Contoh: return this.selectedFavoriteIdpel;
  
    // Contoh sederhana: Mendapatkan nilai idpel dari elemen select di daftar favorit
    const selectElement = document.getElementById('favorit') as HTMLSelectElement;
    return selectElement.value || '';
  }

  getSelectedRekening(): string {
    // Anda perlu mengganti logika ini sesuai dengan bagaimana Anda mendapatkan nilai idpel dari opsi favorit.
    // Misalnya, jika Anda menyimpan nilai idpel favorit dalam properti di komponen, Anda dapat mengambilnya di sini.
    // Contoh: return this.selectedFavoriteIdpel;
  
    // Contoh sederhana: Mendapatkan nilai idpel dari elemen select di daftar favorit
    const selectElement = document.getElementById('rekening') as HTMLSelectElement;
    return selectElement.value || '';
  }

  onCheckboxChange(event: any) {
    this.isSaveToFavoritesChecked = event.target.checked;
    if (!this.isSaveToFavoritesChecked) {
      // Reset the "Nama" field if checkbox is unchecked
      this.inputName = '';
    }
  }

  closeAlert(): void {
    this.submitted = false;
  }

  ngOnInit() {
    // Initialization logic if needed
  }

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
    this.animationState = this.animationState === 'initial' ? 'up' : 'initial';
    this.fadeOutState = this.fadeOutState === 'initial' ? 'fadeOut' : 'initial';
    this.fadeInState = this.fadeInState === 'initial' ? 'fadeIn' : 'initial';
  }

  animationDone() {
    this.animationCompleted = true;
  }

}
