import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CustomerDetails({ route, navigation }) {
  const { dress, quantity, size } = route.params;  // Get dress info, quantity, and size
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleConfirmOrder = () => {
    if (!name || !phone || !address) {
      alert('Please fill all fields.');
      return;
    }
    Alert.alert('Order Confirmation', 'Ordered Successfully');
    navigation.goBack();  // Navigate back after order confirmation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Confirm Order" onPress={handleConfirmOrder} color="#228B22" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5DC' },
  title: { fontSize: 24, color: '#8B4513', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#8B4513', padding: 10, marginBottom: 15, borderRadius: 5 },
});
