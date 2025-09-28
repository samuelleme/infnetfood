import { useState, useEffect, useRef } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import InicialScreen from './screens/InitialScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import SettingsScreen from './screens/SettingsScreen';

let MapScreen;
let RestaurantDetailScreen;

if (Platform.OS !== 'web') {
  MapScreen = require('./screens/MapScreen').default;
  RestaurantDetailScreen = require('./screens/RestaurantDetailScreen').default;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

function AuthStack({ handleLogin, theme }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onLogin={handleLogin} theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppStack({ handleLogout, cartItems, addToCart, removeFromCart, clearCart, theme, toggleTheme }) {
    return (
        <Stack.Navigator initialRouteName="Initial">
            <Stack.Screen
                name="Initial"
                options={{
                    title: 'Categorias',
                    headerRight: () => (
                        <Button
                            onPress={handleLogout}
                            title="Deslogar"
                            color="#FF0000"
                        />
                    ),
                }}
            >
                {props => <InicialScreen {...props} cartItems={cartItems} theme={theme} />}
            </Stack.Screen>
            <Stack.Screen name="Products" options={{ title: 'Produtos' }}>
                {props => <ProductsScreen {...props} cartItems={cartItems} addToCart={addToCart} theme={theme} />}
            </Stack.Screen>
            <Stack.Screen name="Cart" options={{ title: 'Carrinho' }}>
                {props => <CartScreen {...props} cartItems={cartItems} removeFromCart={removeFromCart} theme={theme} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" options={{ title: 'Perfil' }}>
                {props => <ProfileScreen {...props} theme={theme} />}
            </Stack.Screen>
            <Stack.Screen name="Orders" options={{ title: 'Meus pedidos' }}>
              {props => <OrdersScreen {...props} theme={theme} />}
            </Stack.Screen>
            {Platform.OS !== 'web' && (
                <>
                    <Stack.Screen
                        name="Map"
                        options={{ title: 'Mapa de restaurantes' }}
                    >
                      {props => <MapScreen {...props} theme={theme} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="RestaurantDetail"
                        options={{ title: 'Detalhes do restaurante' }}
                    >
                      {props => <RestaurantDetailScreen {...props} theme={theme} />}
                    </Stack.Screen>
                </>
            )}
            <Stack.Screen name="Checkout" options={{ title: 'Finalizar compra' }} >
              {props => <CheckoutScreen {...props} theme={theme} clearCart={clearCart} />}
            </Stack.Screen>
            <Stack.Screen name="Settings" options={{ title: 'Configurações' }}>
              {props => <SettingsScreen {...props} theme={theme} toggleTheme={toggleTheme} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}


export default function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState('light');
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === productId);
      if (itemInCart.quantity === 1) {
        return prevItems.filter(item => item.id !== productId);
      } else {
        return prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleLogin = () => {
    setUser({ id: '1', name: 'Usuário de mock' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navigationTheme = theme === 'light' ? DefaultTheme : DarkTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? (
        <AppStack
            handleLogout={handleLogout}
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            theme={theme}
            toggleTheme={toggleTheme}
        />
      ) : (
        <AuthStack handleLogin={handleLogin} theme={theme} />
      )}
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}