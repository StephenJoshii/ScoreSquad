// app/index.tsx

import { Link } from 'expo-router'; // for navigation
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// The main home screen component
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ScoreSquad!</Text>

      {/* Link to the league screen */}
      <Link href="/league" style={styles.linkButton}>
        <Text style={styles.linkText}>View This Week's League</Text>
      </Link>
    </View>
  );
};

// My styles for this screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'royalblue',
    borderRadius: 8,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;