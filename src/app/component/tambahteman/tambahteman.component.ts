import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TemanService } from 'src/app/services/teman.service';

@Component({
  selector: 'app-tambahteman',
  templateUrl: './tambahteman.component.html',
  styleUrls: ['./tambahteman.component.scss'],
})
export class TambahtemanComponent implements OnInit {
  teman: any = {};
  temanList: any[] = [];
  showPopup = false;
  kataKunciPencarian = '';
  filteredTemanList: any[] = [];
  isInputFocused = false;
  selectedFriends: any[] = [];
  errorMessage: string = '';
  shakeError: boolean = false;
  randomImage: string = '';
  selectedFriendsToShow: any[] = [];
  selectedFriendsFiltered: any[] = [];

  constructor(private temanService: TemanService) {}

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.resetSearch();
  }
  ngOnInit(): void {
    // Mendapatkan daftar teman dari TemanService
    this.selectedFriendsToShow = this.temanService.getSelectedFriends();
    this.temanList = this.temanService.getTemanList();
    this.refreshFilteredTemanList();
  }

  simpanTeman(): void {
    if (!this.teman.nama || !this.teman.nomorWa) {
      this.errorMessage = 'Nama dan Nomor WhatsApp harus diisi!';
      this.shakeError = true;
  
      setTimeout(() => {
        this.shakeError = false;
      }, 800); // Sesuaikan dengan durasi animasi
      return;
    }
  
    if (this.teman.nama.length > 10) {
      this.errorMessage = 'Maksimal 10 Karakter';
      this.shakeError = true;
      return;
    }
  

    // Bersihkan pesan kesalahan jika validasi berhasil
    this.errorMessage = '';
    this.shakeError = false;

    // Tentukan gambar acak untuk teman baru
    this.teman.imgSrc = this.getRandomImage();

    this.temanList.push({ ...this.teman });
    // this.selectedFriends = this.temanService.getSelectedFriends();

    this.teman = {};
    this.closePopup();
    this.refreshFilteredTemanList();
    console.log(this.temanList);
  }

  validasiNama(): void {
    if (this.teman.nama && this.teman.nama.length > 10) {
      this.errorMessage = 'Maksimal 10 Karakter';
      this.shakeError = true;
    } else {
      this.errorMessage = '';
      this.shakeError = false;
    }
  }

  cariTeman(): void {
    if (this.kataKunciPencarian.trim() !== '') {
      this.filteredTemanList = this.temanList.filter((teman) =>
        teman.nama.toLowerCase().includes(this.kataKunciPencarian.toLowerCase())
      );
    } else {
      this.refreshFilteredTemanList();
    }
  }

  // deleteTeman(teman: any): void {
  //   // const index = this.temanList.findIndex(t => t.id === teman.id);

  //   // if (index !== -1) {
  //   //   // Hapus teman dari temanList
  //   //   this.temanList.splice(index, 1);

  //   //   // Hapus teman dari daftar yang dipilih jika ada
  //   //   const selectedFriendIndex = this.selectedFriends.findIndex(friend => friend.id === teman.id);
  //   //   if (selectedFriendIndex !== -1) {
  //   //     this.selectedFriends.splice(selectedFriendIndex, 1);
  //   //   }

  //   //   // Perbarui daftar teman yang ditampilkan
  //   //   this.refreshFilteredTemanList();
  //   // }

  //   const index = this.temanList.findIndex((t) => t.id === teman.id);

  //   if (index !== -1) {
  //     // Hapus teman dari temanList
  //     this.temanList.splice(index, 1);

  //     // Hapus teman dari daftar yang dipilih jika ada
  //     const selectedFriendIndex = this.selectedFriends.findIndex(
  //       (friend) => friend.id === teman.id
  //     );
  //     if (selectedFriendIndex !== -1) {
  //       this.selectedFriends.splice(selectedFriendIndex, 1);

  //       // Hapus teman dari daftar yang ditampilkan
  //       const selectedFriendToShowIndex = this.selectedFriendsToShow.findIndex(
  //         (friend) => friend.id === teman.id
  //       );
  //       if (selectedFriendToShowIndex !== -1) {
  //         this.selectedFriendsToShow.splice(selectedFriendToShowIndex, 1);
  //       }
  //     }

  //     // Perbarui daftar teman yang ditampilkan
  //     this.refreshFilteredTemanList();
  //   }
  // }

  batalPencarian(): void {
    this.kataKunciPencarian = '';
    this.refreshFilteredTemanList();
  }

  resetSearch(): void {
    this.kataKunciPencarian = '';
    this.refreshFilteredTemanList();
    this.errorMessage = '';
  }

  refreshFilteredTemanList(): void {
    this.filteredTemanList = [...this.temanList];
    this.selectedFriendsFiltered = this.selectedFriends.filter((friend) =>
      this.filteredTemanList.includes(friend)
    );

    //   this.filteredTemanList = [...this.temanList];
    // this.selectedFriendsFiltered = this.filteredTemanList.filter(
    //   (friend) => this.selectedFriends.includes(friend)
    // );
  }

  onInputFocus(): void {
    this.isInputFocused = true;
  }

  onInputBlur(): void {
    this.isInputFocused = false;
  }

  selectFriend(teman: any): void {
    const index = this.selectedFriends.findIndex((friend) => friend === teman);

    if (index !== -1) {
      // Teman sudah ada di dalam daftar yang dipilih, hapus dari daftar
      this.selectedFriends.splice(index, 1);

      // Perbarui daftar teman yang ditampilkan
      this.selectedFriendsToShow = this.selectedFriends.slice(); // Membuat salinan untuk memastikan perubahan terdeteksi
    } else {
      // Teman belum ada di dalam daftar yang dipilih, tambahkan ke daftar
      this.selectedFriends.push(teman);

      // Perbarui daftar teman yang ditampilkan
      this.selectedFriendsToShow = this.selectedFriends.slice(); // Membuat salinan untuk memastikan perubahan terdeteksi
      this.temanService.selectFriend(teman);
    }
    console.log(this.selectedFriendsToShow);
  }

  unselectFriend(teman: any): void {
    const index = this.selectedFriends.findIndex((friend) => friend === teman);
    if (index !== -1) {
      // Teman sudah ada di dalam daftar yang dipilih, hapus dari daftar
      this.selectedFriends.splice(index, 1);

      // Hapus teman dari daftar yang ditampilkan
      const indexToShow = this.selectedFriendsToShow.findIndex(
        (friend) => friend === teman
      );
      if (indexToShow !== -1) {
        this.selectedFriendsToShow.splice(indexToShow, 1);
      }
    }
  }

  // Tambahkan metode ini untuk menentukan apakah suatu teman terpilih atau tidak
  isSelectedToShow(teman: any): boolean {
    return this.selectedFriendsToShow.includes(teman);
  }

  getRandomImage(): string {
    const jumlah_gambar = 4; // Sesuaikan dengan jumlah gambar yang Anda miliki
    const nomor_acak = Math.floor(Math.random() * jumlah_gambar) + 1;

    // Sesuaikan dengan struktur nama file gambar Anda
    return `./assets/karakter/gambar_${nomor_acak}.svg`;
  }
}
