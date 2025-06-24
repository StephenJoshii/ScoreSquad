// app/league.tsx

import { Picker } from '@react-native-picker/picker'; // new import
import { addDays, format, subDays } from 'date-fns';
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

import MatchCard, { Match } from '../components/MatchCard';
import { fetchMatches } from '../services/api';

const LeagueScreen = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<Record<string, string>>({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null); // new state for the filter

  useEffect(() => {
    setLoading(true);
    setSelectedLeague(null); // reset filter when date changes
    const getMatches = async () => {
      const dateString = format(currentDate, 'yyyy-MM-dd');
      const matchData = await fetchMatches(dateString);
      const formattedData = matchData.map((match: any) => ({
        id: match.fixture.id.toString(),
        status: match.fixture.status.short,
        league: match.league, // include full league object
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

  // Get a unique list of leagues from the current matches
  const leagues = matches.reduce((acc, match) => {
    const leagueName = match.league.name;
    if (!acc.find(l => l.name === leagueName)) {
      acc.push({ id: match.league.id, name: leagueName });
    }
    return acc.sort((a,b) => a.name.localeCompare(b.name)); // sort them alphabetically
  }, [] as { id: number; name: string }[]);

  // Filter the matches based on the selected league
  const filteredMatches = selectedLeague
    ? matches.filter((match) => match.league.name === selectedLeague)
    : matches;

  const handlePrediction = (matchId: string, selection: string) => {
    setPredictions((prev) => ({ ...prev, [matchId]: selection }));
  };
  const goToNextDay = () => setCurrentDate((prevDate) => addDays(prevDate, 1));
  const goToPreviousDay = () => setCurrentDate((prevDate) => subDays(prevDate, 1));
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
          predictions[matchId] === 'draw' ? 'Draw' :
          predictions[matchId] === 'teamA' ? `${match.teamA.name} Win` :
          `${match.teamB.name} Win`;
        return `- ${match.teamA.name} vs ${match.teamB.name}: You picked ${selectionText}`;
      })
      .join('\n');
    Alert.alert('Your Predictions Submitted!', summary, [{ text: 'OK' }]);
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" style={styles.loader} />;
    }
    if (filteredMatches.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No matches found for this criteria.</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={filteredMatches} // use the filtered list
        renderItem={({ item }) => (
          <MatchCard match={item} onSelect={handlePrediction} selected={predictions[item.id]} />
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Matches' }} />

      <View style={styles.dateSelector}>
        <Pressable onPress={goToPreviousDay}><Text style={styles.dateButton}>{'< Prev'}</Text></Pressable>
        <Text style={styles.dateText}>{format(currentDate, 'd MMMM, yyyy')}</Text>
        <Pressable onPress={goToNextDay}><Text style={styles.dateButton}>{'Next >'}</Text></Pressable>
      </View>

      {/* League Filter Picker */}
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedLeague} onValueChange={(itemValue) => setSelectedLeague(itemValue)}>
          <Picker.Item label="All Leagues" value={null} />
          {leagues.map((league) => (
            <Picker.Item key={league.id} label={league.name} value={league.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.listContainer}>{renderContent()}</View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Predictions</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  emptyText: { fontSize: 16, color: '#888' },
  listContainer: { flex: 1 },
  dateSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  dateButton: { fontSize: 16, color: 'royalblue', fontWeight: 'bold' },
  dateText: { fontSize: 16, fontWeight: 'bold' },
  pickerContainer: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  submitButton: { backgroundColor: 'green', padding: 15, margin: 16, borderRadius: 8 },
  submitButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});

export default LeagueScreen;