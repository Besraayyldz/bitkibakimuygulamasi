import { uploadImage } from '../api'; // doğru yoldan import et
import * as ImagePicker from 'expo-image-picker';
import { Button, View, Image, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function UploadImageScreen() {
  const [imageUri, setImageUri] = useState(null);

  const pickAndUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;

      try {
        const result = await uploadImage(localUri);
        setImageUri(result.imageUrl);
      } catch (error) {
        console.error("Yükleme sırasında hata:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Fotoğraf Yükle" onPress={pickAndUploadImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 100, alignItems: 'center' },
  image: { width: 200, height: 200, marginTop: 20 },
});
