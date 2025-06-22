// components/MatchCard.tsx

import React, { useState } from 'react'; // import useState
import { Pressable, StyleSheet, Text, View } from 'react-native'; // import Pressable
import { Match } from '../constants/data';

type MatchCardProps = {
  match: Match;
};

const MatchCard = ({ match }: MatchCardProps) => {
  // state to remember which team is selected. 'teamA', 'teamB', or 'draw'
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.card}>
      {/* Top section with team names */}
      <View style={styles.teamsContainer}>
        <Text style={styles.teamName}>{match.teamA.name}</Text>
        <Text style={styles.vsText}>VS</Text>
        <Text style={styles.teamName}>{match.teamB.name}</Text>
      </View>

      {/* Bottom section with prediction buttons */}
      <View style={styles.predictionContainer}>
        <Pressable
          style={[styles.button, selected === 'teamA' && styles.selectedButton]}
          onPress={() => setSelected('teamA')}
        >
          <Text style={styles.buttonText}>Win</Text>
        </Pressable>

        <Pressable
          style={[styles.button, selected === 'draw' && styles.selectedButton]}
          onPress={() => setSelected('draw')}
        >
          <Text style={styles.buttonText}>Draw</Text>
        </Pressable>

        <Pressable
          style={[styles.button, selected === 'teamB' && styles.selectedButton]}
          onPress={() => setSelected('teamB')}
        >
          <Text style={styles.buttonText}>Win</Text>
        </Pressable>
      </View>
    </View>
  );
};

// My styles for this component
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
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  vsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginHorizontal: 10,
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
    // a little trick to make text color change when button is selected
    // but the Pressable's style prop can't affect its children directly,
    // so we'll handle this differently later if needed. For now, it's fine.
  },
});

export default MatchCard;