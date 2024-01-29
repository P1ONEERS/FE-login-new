import { Component, OnInit } from '@angular/core';
import { Teman } from 'src/app/model/teman.model';
import { TemanService } from 'src/app/services/teman.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pilihitem',
  templateUrl: './pilihitem.component.html',
  styleUrls: ['./pilihitem.component.scss'],
  providers: [DataService],
})
export class PilihitemComponent implements OnInit {
  selectedFriendsToShow: Teman[] = [];
  data: { itemName: string; quantity: number; price: number }[] = [];
  idItem: string = '';
  submitted: boolean = false;
  yourImageSrc: string = './assets/owner.svg';
  isYourImageClicked: boolean = false;
  friendImageClicked: boolean[] = [];
  yourSelectedItems: { itemName: string; quantity: number; price: number }[] =
    [];
  ownerSelectedItems: { itemName: string; quantity: number; price: number }[] =
    [];
  ownerSelectedItem: {
    itemName: string;
    quantity: number;
    price: number;
  } | null = null;
  userSelectedItems: {
    [userId: string]: { itemName: string; quantity: number; price: number }[];
  } = {};
  userSelectedItem: {
    [userId: string]: {
      itemName: string;
      quantity: number;
      price: number;
    } | null;
  } = {};
  clickedItem: string = '';
  userId: string = '';

  constructor(
    private temanService: TemanService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedFriendsToShow = this.temanService.getSelectedFriends();
    this.data = this.dataService.getData();
    this.route.params.subscribe((params) => {
      this.idItem = params['idItem'] || '';
    });
    this.friendImageClicked = Array(this.selectedFriendsToShow.length).fill(
      false
    );
    this.userId = 'uniqueUserId'; // Set a unique user identifier

    // Initialize userSelectedItems for each friend
    this.selectedFriendsToShow.forEach((friend) => {
      friend.userSelectedItems = { [this.userId]: [] };
    });
  }

  navigateToAdjustQty(itemName: string): void {
    this.router.navigate(['/adjustqty', { idItem: itemName }]);
  }

  toggleYourImageClick() {
    this.isYourImageClicked = !this.isYourImageClicked;

    if (this.isYourImageClicked) {
      // If owner's image is clicked, select all items
      this.ownerSelectedItems = [...this.data];
    } else {
      // If owner's image is unclicked, deselect all items
      this.ownerSelectedItems = [];
    }
  }

  toggleItemSelection(item: {
    itemName: string;
    quantity: number;
    price: number;
  }): void {
    if (this.isYourImageClicked) {
      const itemName = item.itemName;
      const selectedItemIndex = this.yourSelectedItems.findIndex(
        (selectedItem) => selectedItem.itemName === itemName
      );

      if (selectedItemIndex !== -1) {
        this.yourSelectedItems.splice(selectedItemIndex, 1);
      } else {
        const selectedItem = this.data.find(
          (dataItem) => dataItem.itemName === itemName
        );
        if (selectedItem) {
          this.yourSelectedItems.push({ ...selectedItem });
        }
      }
    }
  }

  isItemSelected(itemName: string): boolean {
    return (
      this.isYourImageClicked &&
      this.yourSelectedItems.some((item) => item.itemName === itemName)
    );
  }

  toggleItemSelectionForOwner(item: {
    itemName: string;
    quantity: number;
    price: number;
  }): void {
    if (this.isYourImageClicked) {
      // Toggle the selection of the item for the active user
      const selectedItemIndex = this.yourSelectedItems.findIndex(
        (selectedItem) => selectedItem.itemName === item.itemName
      );

      if (selectedItemIndex !== -1) {
        // If the item is already selected, remove it from the list
        this.yourSelectedItems.splice(selectedItemIndex, 1);
      } else {
        // If the item is not selected, add it to the list and set it as the ownerSelectedItem
        const selectedItem = this.data.find(
          (dataItem) => dataItem.itemName === item.itemName
        );
        if (selectedItem) {
          this.yourSelectedItems.push({ ...selectedItem });
        }
      }

      // Update userSelectedItems for the owner
      this.selectedFriendsToShow.forEach((friend) => {
        friend.userSelectedItems[this.userId] = this.yourSelectedItems;
      });
    }
  }

  isItemSelectedForOwner(itemName: string): boolean {
    return (
      this.isYourImageClicked &&
      this.yourSelectedItems.some((item) => item.itemName === itemName)
    );
  }

  toggleFriendImageClick(index: number) {
    // Toggle the click state for the friend at the given index
    this.friendImageClicked[index] = !this.friendImageClicked[index];

    const selectedFriend = this.selectedFriendsToShow[index];
    if (selectedFriend) {
      if (this.friendImageClicked[index]) {
        // If friend's image is clicked, select all items for the friend
        selectedFriend.selectedItems = [...this.data];
      } else {
        // If friend's image is unclicked, deselect all items for the friend
        selectedFriend.selectedItems = [];
      }
    }
  }

  toggleItemSelectionForUser(item: {
    itemName: string;
    quantity: number;
    price: number;
  }): void {
    if (this.isYourImageClicked) {
      // Toggle the selection of the item for the active user
      const selectedItemIndex = this.yourSelectedItems.findIndex(
        (selectedItem) => selectedItem.itemName === item.itemName
      );

      if (selectedItemIndex !== -1) {
        // If the item is already selected, remove it from the list
        this.yourSelectedItems.splice(selectedItemIndex, 1);
      } else {
        // If the item is not selected, add it to the list
        const selectedItem = this.data.find(
          (dataItem) => dataItem.itemName === item.itemName
        );
        if (selectedItem) {
          this.yourSelectedItems.push({ ...selectedItem });
        }
      }
    }
  }

  isItemSelectedForUser(itemName: string): boolean {
    return (
      this.isYourImageClicked &&
      this.yourSelectedItems.some((item) => item.itemName === itemName)
    );
  }

  isItemClickedForUser(item: {
    itemName: string;
    quantity: number;
    price: number;
  }): boolean {
    return this.clickedItem === item.itemName;
  }

  isItemClicked(item: {
    itemName: string;
    quantity: number;
    price: number;
  }): boolean {
    return this.clickedItem === item.itemName;
  }

  onConfirmButtonClicked() {
    this.submitted = true; // Set submitted to true when the form is submitted

    if (this.idItem) {
      // Perform actions when both idpel and password are present
      this.router.navigate(['/adjustqty', { idItem: this.idItem }]);
    } else {
      // Handle the case when either idpel or password is missing
      console.log('Please fill in both IDPEL and Password.');
    }
  }
}
