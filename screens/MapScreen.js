import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const restaurants = [
  { id: '1', name: 'Confeitaria Colombo', description: 'Histórica confeitaria e restaurante.', latitude: -22.905, longitude: -43.177, address: 'R. Gonçalves Dias, 32 - Centro', menuHighlight: 'Café Colonial Completo' },
  { id: '2', name: 'L`Aperitivo', description: 'Culinária italiana.', latitude: -22.902, longitude: -43.179, address: 'Av. Rio Branco, 156 - Centro', menuHighlight: 'Spaghetti Carbonara' },
  { id: '3', name: 'Cais do Oriente', description: 'Cozinha contemporânea em um casarão.', latitude: -22.900, longitude: -43.175, address: 'R. Visc. de Itaboraí, 8 - Centro', menuHighlight: 'Risoto de Camarão' },
  { id: '4', name: 'Hachiko', description: 'Culinária japonesa.', latitude: -22.908, longitude: -43.176, address: 'Travessa do Paço, 10 - Centro', menuHighlight: 'Rodízio Japonês Premium' },
  { id: '5', name: 'Angu do Gomes', description: 'Comida de boteco tradicional.', latitude: -22.897, longitude: -43.181, address: 'Ladeira de São Francisco, 2 - Saúde', menuHighlight: 'Angu à Baiana' },
  { id: '6', name: 'Bar Luiz', description: 'Tradicional bar e restaurante alemão.', latitude: -22.906, longitude: -43.178, address: 'R. da Carioca, 39 - Centro', menuHighlight: 'Kassler com Chucrute' },
  { id: '7', name: 'Sobrenatural', description: 'Especializado em frutos do mar.', latitude: -22.911, longitude: -43.174, address: 'R. Almirante Alexandrino, 432 - Santa Teresa', menuHighlight: 'Moqueca de Frutos do Mar' },
  { id: '8', name: 'Verdinho', description: 'Comida brasileira variada.', latitude: -22.904, longitude: -43.180, address: 'R. do Lavradio, 2 - Centro', menuHighlight: 'Picanha na Chapa' },
  { id: '9', name: 'Bar do Adão', description: 'Famoso por seus pastéis.', latitude: -22.901, longitude: -43.182, address: 'R. da Alfândega, 199 - Centro', menuHighlight: 'Pastel de Camarão com Catupiry' },
  { id: '10', name: 'Bistrô do Paço', description: 'Culinária francesa no Paço Imperial.', latitude: -22.903, longitude: -43.173, address: 'Praça XV de Novembro, 48 - Centro', menuHighlight: 'Steak au Poivre' },
];

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurantes no Centro do Rio</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.905,
          longitude: -43.178,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            coordinate={{ latitude: restaurant.latitude, longitude: restaurant.longitude }}
            title={restaurant.name}
            description={restaurant.description}
            onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '85%',
  },
});
