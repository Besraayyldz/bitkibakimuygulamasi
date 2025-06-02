import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { plantInfoData } from '../data/PlantInfoData';
import axios from 'axios';

export default function PlantInfoScreen() {
  const handleAddPlant = (plant) => {
  axios.post('http://192.168.137.1:5000/api/plant', {
      name: plant.name,
      description: plant.description,
      light: plant.light,
      watering: plant.watering,
      note: plant.note,
      imageUrl: '', // Şimdilik boş
      wateringIntervalDays: 7, // Varsayılan değer
    })
    .then(() => Alert.alert("Başarılı", `${plant.name} eklendi.`))
    .catch(() => Alert.alert("Hata", "Ekleme işlemi başarısız oldu."));
  };

  return (
    <ScrollView style={styles.container}>
      {plantInfoData.map((plant, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.text}>📖 {plant.description}</Text>
          <Text style={styles.text}>💡 Işık: {plant.light}</Text>
          <Text style={styles.text}>💧 Sulama: {plant.watering}</Text>
          <Text style={styles.text}>📝 Not: {plant.note}</Text>
          <Button title="Koleksiyonuma Ekle" onPress={() => handleAddPlant(plant)} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#e6f4ea',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});
