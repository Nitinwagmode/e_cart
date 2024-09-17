export interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    expiryDate: string; // You can use Date if you prefer
    costPrice: number;
    sellPrice: number;
    discount: number;
    discountedSellPrice: number;
    finalPrice: number;
  }
  