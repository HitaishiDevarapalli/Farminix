export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  weight: string;
  weightOptions?: string[];
  image: string;
  deliveryTime: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  brand: string;
  description: string;
  ingredients?: string[];
  nutritionalInfo?: {
    energy: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export interface DealCard {
  id: string;
  categoryName: string;
  discountBadge: string;
  image: string;
  brands: { name: string; logo: string }[];
}

export interface UserAddress {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  addresses: UserAddress[];
  rewardPoints: number;
  walletBalance: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  discount: number;
  deliveryFee: number;
  finalAmount: number;
  status: 'Order Received' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedTime: string;
  deliveryAddress: UserAddress;
  paymentMethod: string;
}
