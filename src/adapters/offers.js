export const createOffer = (offer) => ({
  city: offer.city.name,
  cityZoom: offer.city.location.zoom,
  isPremium: offer.is_premium,
  cityCoords: [offer.city.location.latitude, offer.city.location.longitude],
  image: offer.preview_image,
  priceValue: `\u20AC${offer.price}`,
  priceText: ` \u2215\u0020night`,
  name: offer.title,
  type: offer.type,
  coords: [offer.location.latitude, offer.location.longitude],
});
