export interface Room {
  id: string;
  name: string;
  subtitle: string;
  category: 'suite' | 'deluxe' | 'family';
  regularPrice: number;
  memberPrice: number;
  size: string;
  bedType: string;
  maxGuests: number;
  movieTickets: number;
  image: string;
  description: string;
  highlights: string[];
  amenities: string[];
  view: string;
  availableStock?: number;
  isActive?: boolean;
}

export interface Booking {
  id: string;
  bookingCode: string;
  createdAt: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  primaryGuest: {
    name: string;
    phone: string;
    email: string;
    arrivalEstimate?: string;
    notes?: string;
  };
  isMember: boolean;
  movieTicketsCount: number;
  movieTicketsClaimed?: boolean;
  addons: {
    airportShuttle: boolean;
    seafoodBreakfast: boolean;
    extraMovieTickets: number;
    snackBucket: boolean;
  };
  pricing: {
    basePrice: number;
    memberDiscount: number;
    addonsTotal: number;
    totalAmount: number;
  };
  status: 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
}

export interface Member {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  tier: '萬秀金牌卡' | '鱸鰻鑽石VIP';
  points: number;
  joinDate: string;
  totalSpent?: number;
  bookingsCount?: number;
}

export interface BossAnnouncement {
  id: string;
  title: string;
  content: string;
  active: boolean;
  date: string;
  priority: 'normal' | 'urgent';
}

