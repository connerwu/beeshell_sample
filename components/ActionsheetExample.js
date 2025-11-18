import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function ActionsheetExample({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.comparison}>
        <Text style={styles.sectionTitle}>测试</Text>
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
  comparison: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default ActionsheetExample;