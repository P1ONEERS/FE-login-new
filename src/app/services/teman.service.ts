import { Injectable } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Teman } from '../model/teman.model';

@Injectable({
  providedIn: 'root',
})
export class TemanService {
  selectedFriendsToShow: any[] = [];

  selectFriendToShow(teman: any): void {
    this.selectedFriendsToShow.push(teman);
  }

  private selectedFriends: Teman[] = [];
  temanList: Teman[] = []; // Tambahkan properti ini

  getSelectedFriends(): Teman[] {
    return this.selectedFriends;
  }

  selectFriend(teman: Teman): void {
    // this.selectedFriends.push(teman);
    if (!this.selectedFriends.includes(teman)) {
      this.selectedFriends.push(teman);
    }
  }

  unselectFriendToShow(teman: any): void {
    const index = this.selectedFriendsToShow.findIndex((friend) => friend === teman);
    if (index !== -1) {
      this.selectedFriendsToShow.splice(index, 1);
    }
  }


  // Tambahkan metode untuk mengambil temanList
  getTemanList(): Teman[] {
    return this.temanList;
  }

  // Tambahkan metode untuk menyimpan temanList
  setTemanList(temanList: Teman[]): void {
    this.temanList = temanList;
  }
}

export const imageAnimation = trigger('imageAnimation', [
  state('initial', style({ transform: 'translateY(0)' })),
  state('up', style({ transform: 'translateX(10%)' })),
  transition('initial => up', animate('1.5s ease-out')),
  // transition('up => initial', animate('0.5s ease-out')),
]);

export const fadeOut = trigger('fadeOut', [
  state('initial', style({ opacity: 1 })),
  state('fadeOut', style({ opacity: 0 })),
  transition('initial => fadeOut', animate('0.5s')),
  transition('fadeOut => initial', animate('2s')),
]);

export const fadeIn = trigger('fadeIn', [
  state('initial', style({ opacity: 0 })),
  state('fadeIn', style({ opacity: 1 })),
  transition('initial => fadeIn', animate('1s')),
  transition('fadeIn => initial', animate('1.5s')),
]);
