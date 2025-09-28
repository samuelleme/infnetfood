import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

export default function CartScreen({ navigation, cartItems, removeFromCart, theme }) {
  const isDarkMode = theme === 'dark';

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
      return total + price * item.quantity;
    }, 0);
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, isDarkMode && styles.cartItemDark]}>
        <View>
            <Text style={[styles.itemName, isDarkMode && styles.textDark]}>{item.name} (x{item.quantity})</Text>
            <Text style={[styles.itemPrice, isDarkMode && styles.textDark]}>R$ {(parseFloat(item.price.replace('R$ ', '').replace(',', '.')) * item.quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
            <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Carrinho</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={[styles.emptyText, isDarkMode && styles.textDark]}>Seu carrinho está vazio.</Text>}
      />
      <View style={styles.totalContainer}>
        <Text style={[styles.totalText, isDarkMode && styles.textDark]}>Total:</Text>
        <Text style={[styles.totalPrice, isDarkMode && styles.textDark]}>R$ {calculateTotal().toFixed(2)}</Text>
      </View>
       {cartItems.length > 0 && (
        <View style={styles.checkoutButtonContainer}>
          <Button
            title="Ir para o checkout"
            onPress={() => navigation.navigate('Checkout')}
          />
        </View>
      )}
    </View>
  );
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
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  cartItemDark: {
    backgroundColor: '#555',
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkoutButtonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  textDark: {
    color: '#fff',
  }
});