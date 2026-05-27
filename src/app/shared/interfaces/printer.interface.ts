export interface Printer {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badgeType: 'new' | 'popular' | null;
  freeService: boolean;
}

export interface RepairService {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface BookingRequest {
  fullName: string;
  email: string;
  phone: string;
  printerModel: string;
  serviceAddress: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  issueDescription: string;
}
