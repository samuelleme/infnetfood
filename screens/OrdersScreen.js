import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockOrders = [
  {
    id: '1',
    date: '2024-07-27',
    total: 'R$ 53,00',
    items: [
      { name: 'Hambúrguer', quantity: 1 },
      { name: 'Refrigerante', quantity: 1 },
    ],
    status: 'Em andamento',
  },
  {
    id: '2',
    date: '2024-07-26',
    total: 'R$ 30,00',
    items: [
      { name: 'Bolo de Chocolate', quantity: 2 },
    ],
    status: 'Entregue',
  },
    {
    id: '3',
    date: '2024-07-25',
    total: 'R$ 45,00',
    items: [
      { name: 'Feijoada', quantity: 1 },
    ],
    status: 'Cancelado',
  },
];

export default function OrdersScreen({ theme }) {
  const [orders, setOrders] = useState(mockOrders);
  const isDarkMode = theme === 'dark';

  const renderOrderItem = ({ item }) => (
    <View style={[styles.orderItem, isDarkMode && styles.orderItemDark]}>
      <View style={styles.orderHeader}>
        <Text style={[styles.orderDate, isDarkMode && styles.textDark]}>Pedido de {item.date}</Text>
        <Text style={[
          styles.orderStatus,
          item.status === 'Entregue' && styles.statusDelivered,
          item.status === 'Cancelado' && styles.statusCanceled,
        ]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.orderBody}>
        {item.items.map((product, index) => (
          <Text key={index} style={[styles.itemText, isDarkMode && styles.textDark]}>
            {product.quantity}x {product.name}
          </Text>
        ))}
      </View>
      <Text style={[styles.orderTotal, isDarkMode && styles.textDark]}>Total: {item.total}</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Meus pedidos</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={[styles.emptyText, isDarkMode && styles.textDark]}>Você não tem pedidos.</Text>}
      />
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
  orderItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderItemDark: {
    backgroundColor: '#555',
    borderColor: '#777',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'orange',
  },
  statusDelivered: {
    color: 'green',
  },
  statusCanceled: {
    color: 'red',
  },
  orderBody: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
  },
  textDark: {
    color: '#fff',
  },
});