import { View, Text, StyleSheet } from 'react-native';

export default function RestaurantDetailScreen({ route, theme }) {
  const { restaurant } = route.params;
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>{restaurant.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>Endereço:</Text>
        <Text style={[styles.info, isDarkMode && styles.textDark]}>{restaurant.address}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>Descrição:</Text>
        <Text style={[styles.info, isDarkMode && styles.textDark]}>{restaurant.description}</Text>
      </View>
      <View style={styles.menuContainer}>
        <Text style={[styles.menuTitle, isDarkMode && styles.textDark]}>Destaque:</Text>
        <Text style={[styles.menuItem, isDarkMode && styles.textDark]}>{restaurant.menuHighlight}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  containerDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
  menuContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  textDark: {
    color: '#fff',
  },
});