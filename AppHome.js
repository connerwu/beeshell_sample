// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

function AppHome({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Button title="Actionsheet" onPress={() => navigation.push('ActionsheetExample')} />
      <Button title="Badge" onPress={() => navigation.push('BadgeExample')} />
      <Button title="BottomModel" onPress={() => navigation.push('BottomModelExample')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  comparison: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default AppHome;