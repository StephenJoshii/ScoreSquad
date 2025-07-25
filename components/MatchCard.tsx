// components/MatchCard.tsx

import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// Updated the Match type to include league info
export type Match = {
  id: string;
  status: string;
  league: {
    id: number;
    name: string;
    logo: string;
  };
  teamA: {
    name: string;
    logo: string;
  };
  teamB: {
    name: string;
    logo: string;
  };
};

type MatchCardProps = {
  match: Match;
  selected: string;
  onSelect: (matchId: string, selection: string) => void;
};

const MatchCard = ({ match, selected, onSelect }: MatchCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          <Image source={{ uri: match.teamA.logo }} style={styles.logo} />
          <Text style={styles.teamName} numberOfLines={2}>{match.teamA.name}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.leagueName} numberOfLines={2}>{match.league.name}</Text>
          <Text style={styles.statusText}>{match.status}</Text>
        </View>
        <View style={styles.team}>
          <Image source={{ uri: match.teamB.logo }} style={styles.logo} />
          <Text style={styles.teamName} numberOfLines={2}>{match.teamB.name}</Text>
        </View>
      </View>
      <View style={styles.predictionContainer}>
        <Pressable
          style={[styles.button, selected === 'teamA' && styles.selectedButton]}
          onPress={() => onSelect(match.id, 'teamA')}
        >
          <Text style={styles.buttonText}>Win</Text>
        </Pressable>
        <Pressable
          style={[styles.button, selected === 'draw' && styles.selectedButton]}
          onPress={() => onSelect(match.id, 'draw')}
        >
          <Text style={styles.buttonText}>Draw</Text>
        </Pressable>
        <Pressable
          style={[styles.button, selected === 'teamB' && styles.selectedButton]}
          onPress={() => onSelect(match.id, 'teamB')}
        >
          <Text style={styles.buttonText}>Win</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  team: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leagueName: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  predictionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'royalblue',
  },
  selectedButton: {
    backgroundColor: 'royalblue',
  },
  buttonText: {
    color: 'royalblue',
    fontWeight: 'bold',
  },
});

export default MatchCard;