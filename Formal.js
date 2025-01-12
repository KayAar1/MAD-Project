import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Modal, TouchableOpacity, Button } from 'react-native';
import { CartContext } from './CartContext';
import { useNavigation } from '@react-navigation/native';

const kidsDresses = [
  { id: '1', image: require('./assets/desi1.jpg'), price: 2500, name: 'Mehndi Green' },
  { id: '2', image: require('./assets/desi2.jpg'), price: 3000, name: 'Mayoun Yellow' },
  { id: '3', image: require('./assets/desi3.jpg'), price: 3500, name: 'Party Pink' },
  { id: '4', image: require('./assets/desi4.jpg'), price: 4000, name: 'Outing Pink' },
  { id: '5', image: require('./assets/desi5.jpg'), price: 2500, name: 'Mehndi Green' },
  { id: '6', image: require('./assets/desi6.jpg'), price: 3000, name: 'Mayoun Yellow' },
  { id: '7', image: require('./assets/desi7.jpg'), price: 3500, name: 'Party Pink' },
  { id: '8', image: require('./assets/desi8.jpg'), price: 4000, name: 'Outing Pink' },
  { id: '9', image: require('./assets/desi9.jpg'), price: 2500, name: 'Mehndi Green' },
  { id: '10', image: require('./assets/desi10.jpg'), price: 3000, name: 'Mayoun Yellow' },
];

export default function KidsCategories() {
  const { addToCart } = useContext(CartContext);
  const [selectedDress, setSelectedDress] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigation = useNavigation();

  const selectDress = (dress) => {
    setSelectedDress(dress);
    setQuantity(1);
    setSelectedSize(null);
  };

  const closeModal = () => {
    setSelectedDress(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    const cartItem = {
      id: selectedDress.id,
      name: selectedDress.name,
      image: selectedDress.image,
      price: selectedDress.price,
      size: selectedSize,
      quantity,
      totalPrice: selectedDress.price * quantity,
    };
    addToCart(cartItem);
    closeModal();
    alert('Added to cart successfully!');
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      alert('Please select a size before placing the order.');
      return;
    }
    const orderItem = {
      id: selectedDress.id,
      name: selectedDress.name,
      image: selectedDress.image,
      price: selectedDress.price,
      size: selectedSize,
      quantity,
      totalPrice: selectedDress.price * quantity,
    };
    
    navigation.navigate('OrderDetails', { orderItem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Women Formal Outfits</Text>
      <FlatList
        data={kidsDresses}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectDress(item)} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>PKR {item.price}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedDress && (
        <Modal visible={true} animationType="slide" transparent={true} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={selectedDress.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedDress.name}</Text>
              <Text style={styles.modalPrice}>PKR {selectedDress.price}</Text>

              <Text style={styles.sizeLabel}>Select Size:</Text>
              <View style={styles.sizeOptions}>
                {['Small', 'Medium', 'Large'].map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[styles.sizeButtonText, selectedSize === size && styles.selectedSizeButtonText]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.quantityContainer}>
                <Text style={styles.sizeLabel}>Quantity:</Text>
                <View style={styles.quantityControls}>
                  <Button title="-" onPress={() => setQuantity((prev) => Math.max(1, prev - 1))} color="#8B4513" />
                  <Text style={styles.quantity}>{quantity}</Text>
                  <Button title="+" onPress={() => setQuantity((prev) => prev + 1)} color="#8B4513" />
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOrderNow} style={styles.orderButton}>
                  <Text style={styles.orderButtonText}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5DC' },
  title: { fontSize: 28, color: '#8B4513', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  card: { flex: 1, margin: 10, backgroundColor: '#fff', borderRadius: 10, padding: 10, alignItems: 'center', elevation: 5 },
  image: { width: 120, height: 150, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 14, color: '#8B4513' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '90%', backgroundColor: '#F5F5DC', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalImage: { width: 200, height: 300, borderRadius: 10, marginBottom: 10 },
  modalTitle: { fontSize: 24, color: '#8B4513', fontWeight: 'bold', marginBottom: 10 },
  modalPrice: { fontSize: 20, color: '#8B4513', marginBottom: 10 },
  sizeLabel: { fontSize: 16, color: '#8B4513', fontWeight: 'bold', marginVertical: 10 },
  sizeOptions: { flexDirection: 'row', marginVertical: 10 },
  sizeButton: { paddingVertical: 8, paddingHorizontal: 16, marginHorizontal: 5, borderRadius: 5, backgroundColor: '#D3D3D3' },
  selectedSizeButton: { backgroundColor: '#8B4513' },
  sizeButtonText: { color: '#8B4513', fontWeight: 'bold' },
  selectedSizeButtonText: { color: '#F5F5DC' },
  quantityContainer: { marginVertical: 10, alignItems: 'center' },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantity: { fontSize: 18, color: '#8B4513', fontWeight: 'bold', marginHorizontal: 10 },
  actionButtons: { flexDirection: 'row', marginTop: 20 },
  closeButton: { marginRight: 10, backgroundColor: '#8B4513', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  closeButtonText: { color: '#F5F5DC', fontWeight: 'bold' },
  addToCartButton: { marginRight: 10, backgroundColor: '#8B4513', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  addToCartButtonText: { color: '#F5F5DC', fontWeight: 'bold' },
  orderButton: { marginRight: 10, backgroundColor: '#8B4513', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  orderButtonText: { color: '#F5F5DC', fontWeight: 'bold' },
});

