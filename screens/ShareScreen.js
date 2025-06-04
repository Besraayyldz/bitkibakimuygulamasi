import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const ShareScreen = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [userId, setUserId] = useState('1'); // test için sabit

  const createPost = async () => {
    try {
      const response = await fetch('http://172.20.10.3:7029/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          caption,
          userId: parseInt(userId),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Başarılı', 'Paylaşım yapıldı!');
      } else {
        Alert.alert('Hata', 'Paylaşım başarısız oldu');
      }
    } catch (error) {
      console.error('İstek hatası:', error);
      Alert.alert('Hata', 'Sunucuya ulaşılamadı');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Resim URL'si"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Açıklama"
        value={caption}
        onChangeText={setCaption}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Kullanıcı ID"
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Paylaş" onPress={createPost} />
    </View>
  );
};

export default ShareScreen;
