import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Modal, TouchableOpacity, Button } from 'react-native';
import { CartContext } from './CartContext';
import { useNavigation } from '@react-navigation/native';

const kidsDresses = [
  { id: 1, name: 'Grey', price: 6000, image: require('./assets/man1.jpg') },
  { id: 2, name: 'Green', price: 5000, image: require('./assets/man2.jpg') },
  { id: 3, name: 'Olive Green', price: 7000, image: require('./assets/man3.jpg') },
  { id: 4, name: 'Navy Blue', price: 4500, image: require('./assets/man4.jpg') },
  { id: 5, name: 'Brown Kurta', price: 3200, image: require('./assets/man5.jpg') },
  { id: 6, name: 'Pastel Kurta', price: 3000, image: require('./assets/man6.jpg') },
  { id: 7, name: 'Pastel', price: 5000, image: require('./assets/man7.jpg') },
  { id: 8, name: 'Purple', price: 3500, image: require('./assets/man8.jpg') },
  { id: 9, name: 'Brown', price: 7000, image: require('./assets/man9.jpg') },
  { id: 10, name: 'Grey Kurta', price: 5500, image: require('./assets/man10.jpg') },
  { id: 11, name: 'Grape Green Kurta', price: 6200, image: require('./assets/man11.jpg') },
  { id: 12, name: 'Black', price: 7300, image: require('./assets/man12.jpg') },
  { id: 13, name: 'Blue', price: 8000, image: require('./assets/man13.jpg') },
  { id: 14, name: 'Orange Kurta', price: 5500, image: require('./assets/man14.jpg') },
  { id: 15, name: 'Maroon Kurta', price: 4700, image: require('./assets/man15.jpg') },
  { id: 16, name: 'Yellow Kurta', price: 4700, image: require('./assets/man16.jpg') },
  { id: 17, name: 'Royal Blue Kurta', price: 4500, image: require('./assets/man17.jpg') },
  { id: 18, name: 'Sky Blue Kurta', price: 3700, image: require('./assets/man18.jpg') },
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
    // Here you can proceed to the order page or trigger any action for the order process
    navigation.navigate('OrderDetails', { orderItem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Men Section</Text>
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

