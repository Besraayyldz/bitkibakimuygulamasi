import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login as loginAPI } from '../api';
import { useAuth } from '../components/AuthContext'; // useAuth'u doğru import et

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // 

  const handleLogin = async () => {
    try {
      const result = await loginAPI(username, password);

      if (result.token) {
        login(result.token);
        Alert.alert("Başarılı", "Giriş yapıldı!");
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
        placeholder="Kullanıcı Adı"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
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
