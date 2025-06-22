// app/index.js

import { Link } from 'expo-router'; // Import the Link component
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to ScoreSquad!</Text>

      {/* This Link will navigate to the 'app/league.js' file */}
      <Link href="/league" style={styles.link}>
        Go to League
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'royalblue',
    color: 'white',
    borderRadius: 5,
  },
});

export default HomeScreen;