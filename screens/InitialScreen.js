import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Platform } from 'react-native';

const categories = [
  { id: '1', name: 'Lanches' },
  { id: '2', name: 'Bebidas' },
  { id: '3', name: 'Sobremesas' },
  { id: '4', name: 'Pratos Principais' },
  { id: '5', name: 'Saladas' },
  { id: '6', name: 'Sopas' },
];

export default function InicialScreen({ navigation, cartItems, theme }) {
  const isDarkMode = theme === 'dark';

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, isDarkMode && styles.categoryItemDark]}
      onPress={() => navigation.navigate('Products', { categoryName: item.name })}
    >
      <Text style={[styles.categoryText, isDarkMode && styles.textDark]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Categorias</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Ver perfil"
          onPress={() => navigation.navigate('Profile')}
        />
        <View style={styles.cartButtonSpacer} />
        <Button
          title="Meus pedidos"
          onPress={() => navigation.navigate('Orders')}
        />
        <View style={styles.cartButtonSpacer} />
        {Platform.OS !== 'web' && (
          <>
            <Button
              title="Restaurantes no mapa"
              onPress={() => navigation.navigate('Map')}
            />
            <View style={styles.cartButtonSpacer} />
          </>
        )}
        <Button
          title="Configurações"
          onPress={() => navigation.navigate('Settings')}
        />
        <View style={styles.cartButtonSpacer} />
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
  categoryItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  categoryItemDark: {
    backgroundColor: '#555',
  },
  categoryText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  cartButtonSpacer: {
    marginTop: 10,
  },
  textDark: {
    color: '#fff',
  }
});