import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email & Password Signup Handler
  const handleSignUp = async () => {
    if (name && email && password) {
      try {
        // Create the user with Firebase Authentication
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        
        // Get the user data
        const user = userCredential.user;

        // Store user info in Firestore
        await firestore().collection('users').doc(user.uid).set({
          name: name,
          email: email,
          createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp when the account was created
        });

        Alert.alert('Success', 'Sign-Up Successful!');
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields!');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/bg.png')} // Path to the background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>DupliDeals Sign Up</Text>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#8B4513"
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter a valid email address"
          placeholderTextColor="#8B4513"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Create a strong password"
          placeholderTextColor="#8B4513"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Sign-Up Button */}
        <Button title="Sign Up" onPress={handleSignUp} color="#8B4513" />

        {/* Log-In Link */}
        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </TouchableOpacity>
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
    fontSize: 28,
    marginBottom: 20,
    color: '#8B4513',
    textAlign: 'center',
    fontWeight: 'bold',
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
  loginText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#8B4513',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});


