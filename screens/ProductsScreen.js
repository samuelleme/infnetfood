import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';

const products = {
  'Lanches': [
    { id: '1', name: 'Hambúrguer', price: 'R$ 25,00' },
    { id: '2', name: 'X-Salada', price: 'R$ 28,00' },
    { id: '3', name: 'Misto Quente', price: 'R$ 15,00' },
  ],
  'Bebidas': [
    { id: '4', name: 'Refrigerante', price: 'R$ 8,00' },
    { id: '5', name: 'Suco Natural', price: 'R$ 10,00' },
    { id: '6', name: 'Água', price: 'R$ 5,00' },
  ],
  'Sobremesas': [
    { id: '7', name: 'Pudim', price: 'R$ 12,00' },
    { id: '8', name: 'Bolo de Chocolate', price: 'R$ 15,00' },
    { id: '9', name: 'Sorvete', price: 'R$ 18,00' },
  ],
   'Pratos Principais': [
    { id: '10', name: 'Feijoada', price: 'R$ 45,00' },
    { id: '11', name: 'Strogonoff', price: 'R$ 40,00' },
  ],
  'Saladas': [
    { id: '12', name: 'Salada Caesar', price: 'R$ 22,00' },
  ],
  'Sopas': [
    { id: '13', name: 'Sopa de Legumes', price: 'R$ 20,00' },
  ],
};

export default function ProductsScreen({ route, navigation, cartItems, addToCart, theme }) {
  const { categoryName } = route.params;
  const productList = products[categoryName] || [];
  const [addedProductId, setAddedProductId] = useState(null);
  const isDarkMode = theme === 'dark';

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedProductId(item.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 300);
  };

  const renderProduct = ({ item }) => (
    <View style={[styles.productItem, isDarkMode && styles.productItemDark]}>
      <View>
        <Text style={[styles.productName, isDarkMode && styles.textDark]}>{item.name}</Text>
        <Text style={[styles.productPrice, isDarkMode && styles.textDark]}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, addedProductId === item.id && styles.addButtonFeedback]}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>{categoryName}</Text>
      <FlatList
        data={productList}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={`Ver carrinho (${cartItems.reduce((sum, item) => sum + item.quantity, 0)})`}
          onPress={() => navigation.navigate('Cart', { cartItems })}
        />
      </View>
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
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  productItemDark: {
    backgroundColor: '#555',
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonFeedback: {
    backgroundColor: '#0056b3',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  textDark: {
    color: '#fff',
  }
});