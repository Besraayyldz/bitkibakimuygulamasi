import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function PlantDetailScreen({ route, navigation }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);

  // Sunucunun adresini buraya yaz (IP adresi olmalı)
  const BASE_URL = 'http://172.20.10.3:7029/api/plant'; // örnek

  useEffect(() => {
    axios.get(`${BASE_URL}/${plantId}`)
      .then(res => setPlant(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = () => {
    axios.put(`${BASE_URL}/${plantId}`, plant)
      .then(() => Alert.alert("Başarılı", "Bitki güncellendi"))
      .catch(() => Alert.alert("Hata", "Güncellenemedi"));
  };

  const handleDelete = () => {
    Alert.alert("Emin misin?", "Bu bitki silinecek!", [
      { text: "İptal", style: "cancel" },
      {
        text: "Sil", style: "destructive", onPress: () => {
          axios.delete(`${BASE_URL}/${plantId}`)
            .then(() => {
              Alert.alert("Silindi", "Bitki silindi");
              navigation.goBack();
            })
            .catch(() => Alert.alert("Hata", "Silinemedi"));
        }
      }
    ]);
  };

  if (!plant) return <Text>Yükleniyor...</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text>Adı</Text>
      <TextInput value={plant.name} onChangeText={(text) => setPlant({ ...plant, name: text })} />

      <Text>Açıklama</Text>
      <TextInput value={plant.description} onChangeText={(text) => setPlant({ ...plant, description: text })} />

      <Text>Işık</Text>
      <TextInput value={plant.light} onChangeText={(text) => setPlant({ ...plant, light: text })} />

      <Text>Sulama</Text>
      <TextInput value={plant.watering} onChangeText={(text) => setPlant({ ...plant, watering: text })} />

      <Text>Not</Text>
      <TextInput value={plant.note} onChangeText={(text) => setPlant({ ...plant, note: text })} />

      <Text>Görsel URL</Text>
      <TextInput value={plant.imageUrl} onChangeText={(text) => setPlant({ ...plant, imageUrl: text })} />

      <Text>Sulama Aralığı (gün)</Text>
      <TextInput
        keyboardType="numeric"
        value={plant.wateringIntervalDays?.toString()}
        onChangeText={(text) => setPlant({ ...plant, wateringIntervalDays: parseInt(text) })}
      />

      <Button title="Güncelle" onPress={handleUpdate} />
      <Button title="Sil" onPress={handleDelete} color="red" />
    </ScrollView>
  );
}
