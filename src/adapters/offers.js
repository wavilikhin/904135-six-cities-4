export const createOffer = (offer) => ({
  id: offer.id,
  city: offer.city.name,
  cityZoom: offer.city.location.zoom,
  isPremium: offer.is_premium,
  cityCoords: [offer.city.location.latitude, offer.city.location.longitude],
  image: offer.preview_image,
  priceValue: offer.price,
  name: offer.title,
  type: offer.type,
  coords: [offer.location.latitude, offer.location.longitude],
  bedrooms: offer.bedrooms,
  description: offer.description,
  goods: offer.goods,
  host: {
    avatar_url: offer.host.avatar_url,
    id: offer.host.id,
    isPro: offer.host.is_pro,
    name: offer.host.name,
  },
  images: offer.images,
  isFavorite: offer.is_favorite,
  location: {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  },
  maxAdults: offer.max_adults,
  rating: offer.rating,
});
