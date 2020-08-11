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
});
