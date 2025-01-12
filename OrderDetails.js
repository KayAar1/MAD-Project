
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function OrderDetails() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const handleConfirmOrder = () => {
    if (!name || !address || !contact) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    Alert.alert('Order Confirmed', 'Your order has been placed successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#8B4513"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#8B4513"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        placeholderTextColor="#8B4513"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={(text) => setContact(text)}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#F5F5DC' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: "#8B4513" },
  input: { borderWidth: 1, borderColor: '#8B4513', borderRadius: 8, padding: 10, marginVertical: 10 },
  confirmButton: { backgroundColor: '#8B4513', padding: 15, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

