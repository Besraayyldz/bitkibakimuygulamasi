import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { register } from '../api'; // api.js'den register fonksiyonunu import et

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const result = await register(username, email, password);

      if (result.success || result.token) { // Sunucunun cevabına göre kontrol et!
        Alert.alert("Başarılı", "Kayıt işlemi başarılı! Giriş yapabilirsin.");
        navigation.navigate('Login'); // Kullanıcıyı giriş ekranına yönlendir
      } else {
        Alert.alert("Hata", result.message || "Kayıt başarısız!");
      }
    } catch (error) {
      console.error("Register error:", error);
      Alert.alert("Hata", "Sunucuya bağlanılamadı.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        placeholder="Kullanıcı Adı"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="E-posta"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Şifre"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Kayıt Ol" onPress={handleRegister} />

      <Text style={styles.loginText}>Zaten hesabın var mı?</Text>
      <Button title="Giriş Yap" onPress={() => navigation.navigate('Login')} />
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
  loginText: {
    marginTop: 20,
    textAlign: 'center',
  },
});
