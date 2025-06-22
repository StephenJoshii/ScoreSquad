// constants/data.ts

// A type definition for a single match
export type Match = {
  id: string;
  teamA: {
    name: string;
    // later we can add more stuff like a logo url
  };
  teamB: {
    name: string;
  };
};

// My list of fake matches for testing the UI
export const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    teamA: { name: 'Manchester City' },
    teamB: { name: 'Arsenal' },
  },
  {
    id: '2',
    teamA: { name: 'Liverpool' },
    teamB: { name: 'Chelsea' },
  },
  {
    id: '3',
    teamA: { name: 'Real Madrid' },
    teamB: { name: 'FC Barcelona' },
  },
  {
    id: '4',
    teamA: { name: 'Bayern Munich' },
    teamB: { name: 'Dortmund' },
  },
  {
    id: '5',
    teamA: { name: 'Juventus' },
    teamB: { name: 'Inter Milan' },
  },
];