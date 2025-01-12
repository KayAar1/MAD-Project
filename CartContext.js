import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Real-time listener for Firestore cart collection
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('cart')
      .onSnapshot(
        (snapshot) => {
          const cartData = snapshot.docs.map((doc) => ({
            id: doc.id, // Firestore document ID
            ...doc.data(),
          }));
          setCart(cartData); // Sync local cart with Firestore
        },
        (error) => {
          Alert.alert('Error', 'Failed to fetch cart data');
          console.error('Firestore listener error:', error);
        }
      );

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  // Add item to Firestore cart collection
  const addToCart = async (item) => {
    try {
      const newItem = { ...item, quantity: item.quantity || 1 };
      await firestore().collection('cart').add(newItem);
      // No manual state update needed; Firestore's real-time listener will handle it
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
      console.error('Add to cart error:', error);
    }
  };

  // Remove item from Firestore cart collection
  const removeFromCart = async (itemId) => {
    try {
      await firestore().collection('cart').doc(itemId).delete();
      // No manual state update needed; Firestore's real-time listener will handle it
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item from cart');
      console.error('Remove from cart error:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


/*import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('cart')
      .onSnapshot(
        (snapshot) => {
          const cartData = snapshot.docs.map((doc) => ({
            id: doc.id, // Firestore's unique document ID
            ...doc.data(),
          }));
          console.log('Fetched cart data:', cartData); // Debug log
          setCart(cartData);
        },
        (error) => {
          Alert.alert('Error', 'Failed to fetch cart data');
          console.error('Firestore listener error:', error);
        }
      );

    return () => unsubscribe();
  }, []);

  const addToCart = async (item) => {
    try {
      const newItem = { ...item, quantity: item.quantity || 1 };
      const docRef = await firestore().collection('cart').add(newItem);
      setCart((prevCart) => [...prevCart, { id: docRef.id, ...newItem }]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
      console.error('Add to cart error:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      console.log('Attempting to remove item:', itemId); // Debug log
      await firestore().collection('cart').doc(itemId).delete();
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item from cart');
      console.error('Remove from cart error:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
*/
