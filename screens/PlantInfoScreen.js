import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, Alert } from 'react-native';
import { plantInfoData } from '../data/PlantInfoData';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; // userId'yi almak için

export default function PlantInfoScreen() {
  const { userId } = useAuth(); // userId burada!

  const handleAddPlant = (plant) => {
    axios.post('http://172.20.10.3:7029/api/plant', {
      name: plant.name,
      description: plant.description,
      light: plant.light,
      watering: plant.watering,
      note: plant.note,
      imageUrl: '', // Şimdilik boş
      wateringIntervalDays: 7,
      userId: userId, // EKLENDİ!
    })
    .then(() => Alert.alert("Başarılı", `${plant.name} eklendi.`))
    .catch(() => Alert.alert("Hata", "Ekleme işlemi başarısız oldu."));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ÜST BOŞLUK */}
      <View style={{ height: 22 }} />
      {plantInfoData.map((plant, index) => (
        <View key={index} style={styles.card}>
          <Image source={plant.image} style={styles.image} resizeMode="cover" />
          <View style={styles.info}>
            <Text style={styles.name}>{plant.name}</Text>
            <Text style={styles.text}>📖 {plant.description}</Text>
            <Text style={styles.text}>💡 Işık: {plant.light}</Text>
            <Text style={styles.text}>💧 Sulama: {plant.watering}</Text>
            <Text style={styles.text}>📝 Not: {plant.note}</Text>
            <View style={styles.buttonWrapper}>
              <Button
                title="Koleksiyonuma Ekle"
                color="#3eb489"
                onPress={() => handleAddPlant(plant)}
              />
            </View>
          </View>
        </View>
      ))}
      {/* ALT BOŞLUK */}
      <View style={{ height: 22 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingTop: 15,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 24,
    paddingHorizontal: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e6f4ea',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 }
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: "#cde",
    marginRight: 18,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    flexWrap: 'wrap'
  },
  buttonWrapper: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
