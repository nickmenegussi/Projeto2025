// // services/placesClient.js
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // troque p/ true quando quiser usar Google Places de verdade
// const USE_GOOGLE = false;
// // se usar Google, defina a key no app.json (EXPO_PUBLIC_GOOGLE_MAPS_KEY)
// const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || '';

// const TTL_NEARBY_MS  = 12 * 60 * 60 * 1000; // 12h
// const TTL_DETAILS_MS = 48 * 60 * 60 * 1000; // 48h

// // MOCK de fallback
// const MOCK_RESULTS = () => [
//   {
//     place_id: 'mock_1',
//     name: 'Sociedade Espírita Gabriel Dellane',
//     rating: 4.7,
//     user_ratings_total: 156,
//     vicinity: 'R. Coração de Maria, 341 - Centro, Esteio - RS, 93280-030',
//     formatted_address: 'R. Coração de Maria, 341 - Centro, Esteio - RS, 93280-030',
//     geometry: { location: { lat: -29.8600, lng: -51.1784 } },
//     photos: [{ photo_reference: '' }],
//     website: 'https://www.gabrieldellane.org.br',
//     formatted_phone_number: '(51) 3473-1301',
//     opening_hours: { 
//       open_now: true,
//       weekday_text: [
//         'Segunda-feira: 19:00 – 21:00',
//         'Terça-feira: 19:00 – 21:00', 
//         'Quarta-feira: 19:00 – 21:00',
//         'Quinta-feira: 19:00 – 21:00',
//         'Sexta-feira: 19:00 – 21:00',
//         'Sábado: 15:00 – 17:00',
//         'Domingo: Fechado'
//       ]
//     },
//     reviews: [
//       {
//         author_name: 'Maria Silva',
//         rating: 5,
//         text: 'Ambiente acolhedor e estudos muito enriquecedores. Os voluntários são muito atenciosos.'
//       },
//       {
//         author_name: 'João Santos', 
//         rating: 4,
//         text: 'Ótimo atendimento, voltarei mais vezes. Só achei o estacionamento um pouco complicado.'
//       }
//     ]
//   },
//   {
//     place_id: 'mock_2',
//     name: 'Centro Espírita Luz e Caridade',
//     rating: 4.8,
//     user_ratings_total: 89,
//     vicinity: 'Rua das Flores, 123 - Centro, São Paulo - SP',
//     geometry: { location: { lat: -23.5505, lng: -46.6333 } },
//     photos: [{ photo_reference: 'mockphoto2' }],
//     website: 'https://www.luzecaridade.org.br',
//     formatted_phone_number: '(11) 9999-8888',
//     opening_hours: { open_now: false },
//   },
// ];
// const setCache = (key, data, ttl) =>
//   AsyncStorage.setItem(key, JSON.stringify({ data, expiresAt: Date.now() + ttl }));

// export const placePhotoUrl = (photoRef, maxwidth = 800) =>
//   USE_GOOGLE && photoRef
//     ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${photoRef}&key=${GOOGLE_KEY}`
//     : 'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1200&q=60&auto=format';

// export const nearbySearch = async ({ lat, lng, keyword = 'centro espírita', radius = 3000 }) => {
//   const cacheKey = `nearby:${lat.toFixed(3)}:${lng.toFixed(3)}:${radius}:${keyword}`;
//   const cached = await getCache(cacheKey);
//   if (cached) return cached;

//   let results = [];
//   if (USE_GOOGLE && GOOGLE_KEY) {
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_KEY}&location=${lat},${lng}&radius=${radius}&keyword=${encodeURIComponent(
//       keyword
//     )}&language=pt-BR`;
//     const res = await fetch(url);
//     const data = await res.json();
//     results = data.results || [];
//   } else {
//     results = MOCK_RESULTS();
//   }

//   await setCache(cacheKey, results, TTL_NEARBY_MS);
//   return results;
// };

// export const placeDetails = async (place_id) => {
//   const cacheKey = `details:${place_id}`;
//   const cached = await getCache(cacheKey);
//   if (cached) return cached;

//   let result = null;
//   if (USE_GOOGLE && GOOGLE_KEY) {
//     const fields =
//       'name,formatted_address,geometry,website,opening_hours,formatted_phone_number,rating,user_ratings_total,photos,url';
//     const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_KEY}&place_id=${place_id}&language=pt-BR&fields=${fields}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     result = data.result || null;
//   } else {
//     result = MOCK_RESULTS().find((m) => m.place_id === place_id) || null;
//   }

//   await setCache(cacheKey, result, TTL_DETAILS_MS);
//   return result;
// };

// export const toAppModel = (p) => {
//   const photoRef = p.photos?.[0]?.photo_reference;
//   return {
//     id: p.place_id || p.id,
//     place_id: p.place_id,
//     name: p.name,
//     address: p.vicinity || p.formatted_address || 'Endereço não informado',
//     distance: null,
//     phone: p.formatted_phone_number || null,
//     website: p.website || null,
//     schedule: p.opening_hours ? p.opening_hours.weekday_text?.join(' | ') || (p.opening_hours.open_now ? 'Aberto agora' : 'Fechado agora') : null,
//     coordinates: {
//       latitude: p.geometry?.location?.lat,
//       longitude: p.geometry?.location?.lng,
//     },
//     rating: p.rating || null,
//     totalRatings: p.user_ratings_total || null,
//     image: placePhotoUrl(photoRef),
//     activities: ['Estudo', 'Passes', 'Atendimento Fraterno', 'Evangelização'],
//     description: `Centro espírita ${p.name} com atividades regulares para a comunidade. Local de paz e aprendizado da doutrina espírita.`,
//     reviews: p.reviews ? p.reviews.map(r => ({
//       author: r.author_name,
//       rating: r.rating,
//       comment: r.text
//     })) : [],
//   };
// };