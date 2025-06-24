// app/league.tsx

import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MatchCard, { Match } from '../components/MatchCard'; // Import the Match type
import { fetchMatches } from '../services/api';

const LeagueScreen = () => {
  // We now use the Match type from MatchCard to keep things consistent
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<Record<string, string>>({});

  useEffect(() => {
    const getMatches = async () => {
      const matchData = await fetchMatches();

      // The shape of this object now includes logos and status
      const formattedData = matchData.map((match: any) => ({
        id: match.fixture.id.toString(),
        status: match.fixture.status.short,
        teamA: {
          name: match.teams.home.name,
          logo: match.teams.home.logo,
        },
        teamB: {
          name: match.teams.away.name,
          logo: match.teams.away.logo,
        },
      }));

      setMatches(formattedData);
      setLoading(false);
    };

    getMatches();
  }, []);

  // ... (handlePrediction and handleSubmit functions remain the same)
  const handlePrediction = (matchId: string, selection: string) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: selection,
    }));
  };

  const handleSubmit = () => {
    const predictionKeys = Object.keys(predictions);
    if (predictionKeys.length === 0) {
      Alert.alert('No Predictions', 'Please make a prediction for at least one match.');
      return;
    }
    const summary = predictionKeys
      .map((matchId) => {
        const match = matches.find((m) => m.id === matchId);
        if (!match) return 'Unknown Match';
        const selectionText =
          predictions[matchId] === 'draw'
            ? 'Draw'
            : predictions[matchId] === 'teamA'
            ? `${match.teamA.name} Win`
            : `${match.teamB.name} Win`;
        return `- ${match.teamA.name} vs ${match.teamB.name}: You picked ${selectionText}`;
      })
      .join('\n');
    Alert.alert('Your Predictions Submitted!', summary, [{ text: 'OK' }]);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Todays Matches' }} />

      <FlatList
        data={matches}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onSelect={handlePrediction}
            selected={predictions[item.id]}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Predictions</Text>
      </Pressable>
    </View>
  );
};

// ... (styles remain the same)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    margin: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default LeagueScreen;