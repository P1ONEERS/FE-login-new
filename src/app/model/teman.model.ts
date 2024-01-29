export interface Teman {
  nama: string;
  nomorWa: string;
  imgSrc: string;
  selectedItems: { itemName: string; quantity: number; price: number }[];
  userSelectedItems: {
    [userId: string]: { itemName: string; quantity: number; price: number }[];
  };
  // tambahkan properti lain jika diperlukan
}
