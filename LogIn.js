import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user login
  const handleLogIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/bg.png')} // Path to your background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#8B4513"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
         <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#8B4513"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

        {/* Log In Button */}
        <Button title="Log In" onPress={handleLogIn} color="#8B4513" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',  // Position the form absolutely within the background
    top: '50%',  // Start the form from the middle of the screen
    width: '90%',  // Limit the width of the form
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',  // Semi-transparent background for the form
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#8B4513',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#8B4513',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 16,
    color: '#4B2E2A',
    width: '100%',  // Ensure inputs span the full width of the form
  },
});
