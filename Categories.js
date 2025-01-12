import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Categories({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Replica Dress Categories</Text>
      <Button title="Men" onPress={() => navigation.navigate('SubCategoriesWomen', { category: 'Men' })} color="#8B4513" />
      <Button title="Women" onPress={() => navigation.navigate('SubCategoriesWomen', { category: 'Women' })} color="#8B4513" />
      <Button title="Kids" onPress={() => navigation.navigate('SubCategoriesWomen', { category: 'Women' })} color="#8B4513" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5DC' },
  title: { fontSize: 24, color: '#8B4513', marginBottom: 20 },
});
