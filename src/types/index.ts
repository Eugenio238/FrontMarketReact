// Types pour l'application MarketPlace

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'vendeur' | 'client';
  createdAt: Date;
  phone?: string;
  whatsappNumber?: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isSold: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  interests: number;
}

export interface Subscription {
  id: string;
  vendorId: string;
  type: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  maxProducts: number;
  price: number;
  isActive: boolean;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface Stats {
  vendorId: string;
  totalViews: number;
  totalInterests: number;
  totalProducts: number;
  linkClicks: number;
  topProduct?: Product;
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  type: 'view' | 'interest' | 'product_added' | 'product_sold' | 'link_click';
  productId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface PaymentInfo {
  phone: string;
  amount: number;
  type: 'mobile_money';
  reference: string;
}

export interface VendorProfile {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  publicUrl: string;
  whatsappNumber: string;
  isActive: boolean;
  products: Product[];
  stats: Stats;
}


export interface AuthResponse {
  user: User;
  token: string;
}

export interface UpdateUserResponse {
  user: User;
}
