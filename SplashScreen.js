
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignUp');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/image.png')} // Path to logo
        style={styles.logo}
      />
      <Text style={styles.title}>DupliDeals</Text>
      <Text style={styles.slogan}>Where Trends Meet Savings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#8B4513',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 18,
    color: '#8B4513',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
