// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

function AppHome({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <Button title="Actionsheet" onPress={() => navigation.push('ActionsheetExample')} />
      </View>
      <View style={styles.item}>
        <Button title="Badge" onPress={() => navigation.push('BadgeExample')} />
      </View>
      
      <View style={styles.item}>
        <Button title="BottomModel" onPress={() => navigation.push('BottomModelExample')} />
      </View>
      
      <View style={styles.item}>
        <Button title="Picker" onPress={() => navigation.push('PickerExample')} />
      </View>
      
      <View style={styles.item}>
        <Button title="Radio" onPress={() => navigation.push('RadioExample')} />
      </View>
      
      <View style={styles.item}>
        <Button title="Rate" onPress={() => navigation.push('RateExample')} />
      </View>
      
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