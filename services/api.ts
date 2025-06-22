// services/api.ts

const API_KEY = process.env.EXPO_PUBLIC_API_FOOTBALL_KEY as string;
const API_HOST = 'v3.football.api-sports.io';

export const fetchMatches = async () => {
  console.log('Fetching matches from API...');

  try {
    // UPDATED URL: Changed from Premier League to Brazilian Serie A
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=71&season=2025`, // Brazilian Serie A
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