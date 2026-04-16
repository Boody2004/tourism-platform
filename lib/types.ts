export interface Trip {
  id: string;
  title: string;
  slug: string;
  destination: string;
  type: string;
  groupSize: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  featured: boolean;
  images: string[];
  details: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BookingRequest {
  id: string;
  tripId?: string;
  tripTitle?: string;
  name: string;
  phone: string;
  email?: string;
  travelDate: string;
  country: string;
  adults: number;
  children: number;
  status: "New" | "Closed";
  createdAt: string;
  // Tailor Made specific fields
  isTailorMade?: boolean;
  requestTitle?: string;
  arrivalDate?: string;
  departureDate?: string;
  nationality?: string;
  wishTo?: string;
  note?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  publishedAt: string;
  readTime: string;
}
