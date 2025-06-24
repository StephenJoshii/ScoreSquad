// services/api.ts

const API_KEY = process.env.EXPO_PUBLIC_API_FOOTBALL_KEY as string;
const API_HOST = 'v3.football.api-sports.io';

// Update the function to accept a date string
export const fetchMatches = async (date: string) => {
  console.log(`Fetching matches from API for date: ${date}`);

  try {
    // Use the dynamic date in the URL
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${date}`,
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