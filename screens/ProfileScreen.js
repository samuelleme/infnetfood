import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen({ theme }) {
  const isDarkMode = theme === 'dark';
  const user = {
    name: 'Samuel',
    email: 'sam@sam.com',
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>Nome:</Text>
        <Text style={[styles.info, isDarkMode && styles.textDark]}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.label, isDarkMode && styles.textDark]}>E-mail:</Text>
        <Text style={[styles.info, isDarkMode && styles.textDark]}>{user.email}</Text>
      </View>
    </View>
  );
};

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 80,
  },
  info: {
    fontSize: 18,
  },
  textDark: {
    color: '#fff',
  },
});