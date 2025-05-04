import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login } from '../api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await login(email, password);

      if (result.token) {
        console.log("Giriş başarılı:", result);
        Alert.alert("Başarılı", "Giriş yapıldı!");
        // TODO: JWT token sakla veya yönlendir
      } else {
        Alert.alert("Hata", result.message || "Giriş başarısız!");
      }

    } catch (error) {
      console.error("Hata:", error);
      Alert.alert("Hata", "Sunucuya bağlanılamadı.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Şifre"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Giriş Yap" onPress={handleLogin} />

      <Text style={styles.registerText}>Hesabın yok mu?</Text>
      <Button title="Kayıt Ol" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
  },
});
