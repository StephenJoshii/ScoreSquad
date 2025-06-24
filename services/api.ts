// services/api.ts

const API_KEY = process.env.EXPO_PUBLIC_API_FOOTBALL_KEY as string;
const API_HOST = 'v3.football.api-sports.io';

export const fetchMatches = async () => {
  console.log('Fetching matches from API for a specific date...');

  try {
    // UPDATED URL: Changed to fetch all games on a specific date
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=2025-06-24`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY,
        },
      }
    );

    const data = await response.json();

    console.log('API Response:', data.response.length, 'matches received');
    return data.response;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};