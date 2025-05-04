import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { register } from '../api'; // api.js içindeki register fonksiyonunu çağırıyoruz

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor.');
      return;
    }

    try {
      const result = await register(username, email, password);

      if (result.message && result.message.toLowerCase().includes('başarı')) {
        Alert.alert('Başarılı', 'Kayıt tamamlandı!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Hata', result.message || 'Kayıt başarısız.');
      }
    } catch (error) {
      console.error('Kayıt Hatası:', error);
      Alert.alert('Hata', 'Sunucuya ulaşılamadı.');
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
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Şifre"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Şifre (Tekrar)"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
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
