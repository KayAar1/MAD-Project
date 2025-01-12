import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from './CartContext';
import firestore from '@react-native-firebase/firestore';

const Cart = ({ navigation }) => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Remove from Firestore
      await firestore().collection('cart').doc(itemId).delete();

      // Remove from local cart context
      removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item from Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? ( // Check if the cart is empty
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()} // Ensure `id` is unique
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.text}>Size: {item.size || 'N/A'}</Text>
                <Text style={styles.text}>Quantity: {item.quantity}</Text>
                <Text style={styles.text}>Price: PKR {item.price}</Text>
                <Text style={styles.text}>Total: PKR {item.price * item.quantity}</Text>
                <Button
                  title="Remove"
                  color="#8B4513"
                  onPress={() => handleRemoveItem(item.id)}
                />
              </View>
            )}
          />
          <Text style={styles.totalText}>Total Price: PKR {calculateTotal()}</Text>
          {/* Order Button */}
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate('OrderPage')}
          >
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5DC', // Beige background
  },
  cartItem: {
    backgroundColor: '#FFF8DC', // Light beige for items
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8B4513', // Brown border
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513', // Brown text
  },
  text: {
    fontSize: 14,
    color: '#8B4513', // Brown text
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#8B4513', // Brown text
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#8B4513', // Brown text
  },
  orderButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8B4513', // Brown background
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 5, // Add shadow
  },
  orderButtonText: {
    color: '#FFF8DC', // Light beige text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cart;

