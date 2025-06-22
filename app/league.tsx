// app/league.tsx

import React from 'react';
// We added Pressable and Text here
import { Stack } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

// get my fake data
import MatchCard from '../components/MatchCard';
import { MOCK_MATCHES } from '../constants/data';

const LeagueScreen = () => {
  return (
    <View style={styles.container}>
      {/* Page header */}
      <Stack.Screen options={{ title: 'Weekend Matches' }} />

      {/* The list of matches */}
      <FlatList
        data={MOCK_MATCHES}
        renderItem={({ item }) => <MatchCard match={item} />}
        keyExtractor={(item) => item.id}
      />

      {/* This is the new button we added */}
      <Pressable
        style={styles.submitButton}
        onPress={() => console.log('Submit button pressed!')}
      >
        <Text style={styles.submitButtonText}>Submit Predictions</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Note: I removed the padding from here to make the list flush
    // and let the MatchCard handle its own horizontal margin.
  },
  // These are the new styles we added
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