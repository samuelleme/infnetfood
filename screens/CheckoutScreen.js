import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,  Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

let LottieView;
if (Platform.OS !== 'web') {
  LottieView = require('lottie-react-native').default;
}


export default function CheckoutScreen({ navigation, theme, clearCart }) {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const isDarkMode = theme === 'dark';

  const handleConfirmOrder = async () => {
    if (!address.trim() || !paymentMethod.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsConfirmed(true);
    
    if (Platform.OS !== 'web') {
      await schedulePushNotification();
    }
    
    clearCart();

    setTimeout(() => {
        setIsConfirmed(false);
        navigation.navigate('Initial');
    }, 2000);
  };

  if (isConfirmed) {
    if (Platform.OS === 'web' || !LottieView) {
      return (
        <View style={[styles.lottieContainer, isDarkMode && styles.containerDark]}>
          <Text style={[styles.confirmedText, isDarkMode && styles.textDark]}>Pedido confirmado!</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.lottieContainer, isDarkMode && styles.containerDark]}>
          <LottieView
            source={require('../assets/confirmed.json')}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
          <Text style={[styles.confirmedText, isDarkMode && styles.textDark]}>Pedido confirmado!</Text>
        </View>
      );
    }
  }

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Checkout</Text>

      <Text style={[styles.label, isDarkMode && styles.textDark]}>Endereço de entrega</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Digite endereço completo"
        placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={[styles.label, isDarkMode && styles.textDark]}>Forma de pagamento</Text>
      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={[styles.paymentButton, isDarkMode && styles.paymentButtonDark, paymentMethod === 'Cartão de crédito' && styles.selected]}
          onPress={() => setPaymentMethod('Cartão de crédito')}
        >
          <Text style={[styles.paymentButtonText, isDarkMode && styles.textDark]}>Cartão de crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, isDarkMode && styles.paymentButtonDark, paymentMethod === 'PIX' && styles.selected]}
          onPress={() => setPaymentMethod('PIX')}
        >
          <Text style={[styles.paymentButtonText, isDarkMode && styles.textDark]}>PIX</Text>
        </TouchableOpacity>
      </View>

      <Button title="Confirmar" onPress={handleConfirmOrder} />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pedido confirmado!!",
      body: 'Seu pedido está sendo preparadoe já já sairá para entrega!',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  inputDark: {
    borderColor: '#777',
    color: '#fff',
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  paymentButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  paymentButtonDark: {
    borderColor: '#777',
  },
  selected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  paymentButtonText: {
    fontSize: 16,
    color: '#333',
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  confirmedText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textDark: {
    color: '#fff',
  },
});