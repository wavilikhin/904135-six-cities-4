type Host = {
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
  cityCoords: number[];
  isPremium: boolean;
  image: string;
  priceValue: number;
  name: string;
  type: string;
  coords: number[];
  rating: number;
  cityZoom: number;
  bedrooms: number;
  description: string;
  goods: string[];
  host: Host;
  images: string[];
  isFavorite: boolean;
  location: Location;
  maxAdults: number;
  raiting: number;
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
  raiting: number;
  user: User;
};

export type Comment = {
  comment: string;
  raiting: number;
};
