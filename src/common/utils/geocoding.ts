import axios from 'axios';

export type Coordinates = {
  lat: number;
  lng: number;
};

export const getCoordinates = async (address: string): Promise<Coordinates> => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
  const response = await axios.get(url).then((res) => res.data);
  if (response.length > 0) {
    const lat = +response[0].lat;
    const lng = +response[0].lon;
    return { lat, lng };
  } else {
    throw new Error('Url not found !');
  }
};
