

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WomenCategories({ navigation }) {
  const categories = ['Casual', 'Formal', 'Fancy'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Women Categories</Text>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.category}
          onPress={() => navigation.navigate(category)}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 28,
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  category: {
    padding: 20,
    backgroundColor: '#C8AD7F',
    borderRadius: 10,
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});
