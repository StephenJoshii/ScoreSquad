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
// for formatting dates
import { addDays, format, subDays } from 'date-fns';

import MatchCard, { Match } from '../components/MatchCard';
import { fetchMatches } from '../services/api';

const LeagueScreen = () => {
  // component states
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<Record<string, string>>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  // fetch matches when the date changes
  useEffect(() => {
    setLoading(true);
    const getMatches = async () => {
      const dateString = format(currentDate, 'yyyy-MM-dd');
      const matchData = await fetchMatches(dateString);

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
  }, [currentDate]);

  // my helper functions
  const handlePrediction = (matchId: string, selection: string) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: selection,
    }));
  };

  const goToNextDay = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 1));
  };

  const goToPreviousDay = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 1));
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

  // handle loading state
  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  // my UI
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Matches' }} />

      {/* date nav buttons */}
      <View style={styles.dateSelector}>
        <Pressable onPress={goToPreviousDay}>
          <Text style={styles.dateButton}>{'< Prev'}</Text>
        </Pressable>
        <Text style={styles.dateText}>{format(currentDate, 'd MMMM, yyyy')}</Text>
        <Pressable onPress={goToNextDay}>
          <Text style={styles.dateButton}>{'Next >'}</Text>
        </Pressable>
      </View>

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

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateButton: {
    fontSize: 16,
    color: 'royalblue',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
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