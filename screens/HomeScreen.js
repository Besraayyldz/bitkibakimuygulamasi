import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitki Bakım Uygulamasına Hoş Geldin!</Text>

      <Button title="Bitkilerim" onPress={() => navigation.navigate('Plants')} />
      <Button title="Profil" onPress={() => navigation.navigate('Profile')} />
      <Button title="Çıkış Yap" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
});
