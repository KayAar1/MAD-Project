import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Home from './Home';
import Categories from './Categories';
import KidsCategories from './KidsCategories';
import MenCategories from './MenCategories';
import WomenCategories from './WomenCategories';
import Casual from './Casual';
import Formal from './Formal';
import Fancy from './Fancy';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import OrderDetails from './OrderDetails';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="KidsCategories" component={KidsCategories} />
        <Stack.Screen name="MenCategories" component={MenCategories} />
        <Stack.Screen name="WomenCategories" component={WomenCategories} />
        <Stack.Screen name="Casual" component={Casual} />
        <Stack.Screen name="Formal" component={Formal} />
        <Stack.Screen name="Fancy" component={Fancy} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ title: 'Order Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}
