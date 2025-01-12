import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]); // Manage cart items

  // Slide images
  const slideshowImages = [
    { id: 1, source: require('./assets/desi2.jpg') },
    { id: 2,  source: require('./assets/boy7.jpg') },
    { id: 3, source: require('./assets/desi3.jpg') },
    { id: 4, source: require('./assets/desi4.jpg') },
    { id: 5, source: require('./assets/man5.jpg') },
    { id: 6, source: require('./assets/desi1.jpg') },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Update slide index continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length);
    }, 3000); // Change the slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.toLowerCase() === 'casual') {
      navigation.navigate('Casual'); // Navigate to CasualPage
    } else if (searchQuery.toLowerCase() === 'formal') {
      navigation.navigate('Formal'); // Navigate to FormalPage
    } else if (searchQuery.toLowerCase() === 'fancy') {
      navigation.navigate('Fancy');
    } else {
      alert('No matching category found'); // Display an alert for unmatched queries
    }
  };

  // Cart Section
  const openCart = () => {
    navigation.navigate('Cart'); // Navigate to CartPage to view cart items
  };

  // My Orders Section
  //const openOrders = () => {
 //   navigation.navigate('OrderDetails'); // Navigate to MyOrdersPage to view orders
 // };

  return (
    <View style={styles.container}>
      {/* Header Section with Search, My Orders, and Cart Buttons */}
      <View style={styles.header}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Categories For Women"
            placeholderTextColor="#8B4513"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch} // Call search function on enter
          />
        </View>

        
       

        {/*<TouchableOpacity style={styles.ordersButton} onPress={openOrders}>
          <Text style={styles.ordersText}>My Orders</Text>
        </TouchableOpacity>  */}
        <TouchableOpacity onPress={openCart}>
          <Text style={styles.cartText}>🛒</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cc}>For online tailor service, Contact : 03167788665</Text>
      <Text style={styles.title}>New Arrivals</Text>
       
      {/* Slideshow Section */}
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.slideshow}
      >
        <Image
          key={slideshowImages[currentSlide].id}
          source={slideshowImages[currentSlide].source}
          style={styles.slideshowImage}
        />
      </ScrollView>

      {/* Category List */}
      <ScrollView>
        {['Men', 'Women', 'Kids'].map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.category}
            onPress={() => {
              if (category === 'Men') {
                navigation.navigate('MenCategories');
              } else if (category === 'Women') {
                navigation.navigate('WomenCategories');
              } else if (category === 'Kids') {
                navigation.navigate('KidsCategories');
              }
            }}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5DC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 20,
    color: '#8B4513',
  },
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderColor: '#8B4513',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Cochin',
    color: '#4B2E2A',
    flex: 1,
  },
  ordersButton: {
    marginHorizontal: 10,
    backgroundColor: '#8B4513',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  ordersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartText: {
    fontSize: 30,
    color: '#8B4513',
  },
  title: {
    fontSize: 28,
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  slideshow: {
    height: 300, // Reduced height for slideshow
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideshowImage: {
    width: 250, // Reduced width
    height: 300, // Reduced height
    resizeMode: 'cover',
    borderRadius: 10,
    borderTopLeftRadius: 10, // Curve top-left corner
    borderTopRightRadius: 10,
    
  },
  category: {
    padding: 20,
    backgroundColor: '#C8AD7F',
    borderRadius: 10,
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  cc: {
    fontSize: 14,
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
});

