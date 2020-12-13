type Host = {
  id: number;
  isPro: boolean;
  avatar_url: string;
  name: string;
};

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type OfferInfo = {
  id: number;
  city: string;
  cityZoom: number;
  isPremium: boolean;
  cityCoords: [number, number];
  image: string;
  priceValue: number;
  name: string;
  type: string;
  coords: [number, number];
  bedrooms: number;
  description: string;
  goods: string[];
  host: Host;
  images: string[];
  isFavorite: boolean;
  location: Location;
  maxAdults: number;
  rating: number;
  adapted: boolean;
};

type User = {
  avatar_url: string;
  id: number;
  is_pro: boolean;
  name: string;
};
export type ReviewItem = {
  comment: string;
  id: number;
  date: string;
  rating: number;
  user: User;
};

export type Comment = {
  comment: string;
  rating: number;
};
