
// lib/api.js
import axios from 'axios';

export const Offers = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
