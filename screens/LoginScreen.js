import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default function LoginScreen({ navigation, onLogin, theme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isDarkMode = theme === 'dark';

  const handleLogin = () => {
    if (email === '' || password === '') {
      setErrorMessage('Preencha todos os campos.');
    } else {
      setErrorMessage('');
      onLogin();
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Login</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="E-mail"
        placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Senha"
        placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Entrar"
        onPress={handleLogin}
      />
      <View style={styles.buttonSpacer}>
        <Button
          title="Voltar para home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  inputDark: {
    borderColor: '#777',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonSpacer: {
    marginTop: 10,
  },
  textDark: {
    color: '#fff',
  },
});