import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
// Eğer AuthContext varsa oradan userId alabilirsin
import { useAuth } from '../components/AuthContext';

const ProfileScreen = () => {
  const { userToken, userId } = useAuth(); // userId'yi login olurken AuthContext'e kaydediyorsun

  const [activeTab, setActiveTab] = useState('plants');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Profil bilgileri sabit örnek, backend ile çekebilirsin
  const user = {
    name: 'Kullanıcı Adı',
    followers: 15,
    following: 32,
    image: require('../assets/icon.png'),
  };

  // Bitkilerim tabına gelince veri çek
  useEffect(() => {
    if (activeTab === 'plants' && userId) {
      setLoading(true);
      axios.get(`http://172.20.10.3:7029/api/plant/user/${userId}`)
        .then(res => setPlants(res.data))
        .catch(() => setPlants([]))
        .finally(() => setLoading(false));
    }
  }, [activeTab, userId]);

  return (
    <View style={styles.container}>
      {/* Profil Bilgisi */}
      <View style={styles.header}>
        <Image source={user.image} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.follow}>Takipçi: {user.followers}  Takip: {user.following}</Text>
        </View>
      </View>

      {/* Sekmeler */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && { backgroundColor: '#3eb489', color: '#fff' }]}
          onPress={() => setActiveTab('posts')}
        >
          <Text style={{ color: activeTab === 'posts' ? '#fff' : '#000' }}>Paylaşımlarım</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'plants' && { backgroundColor: '#3eb489', color: '#fff' }]}
          onPress={() => setActiveTab('plants')}
        >
          <Text style={{ color: activeTab === 'plants' ? '#fff' : '#000' }}>Bitkilerim</Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      {activeTab === 'plants' ? (
        loading ? (
          <ActivityIndicator size="large" color="#3eb489" style={{ marginTop: 40 }} />
        ) : plants.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 50 }}>Henüz koleksiyonuna bitki eklemedin.</Text>
        ) : (
          <FlatList
            data={plants}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.plantCard}>
                <Image source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/icon.png')} style={styles.postImage} />
                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
              </View>
            )}
          />
        )
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Paylaşımlarım burada olacak</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  userInfo: { marginLeft: 20 },
  name: { fontSize: 18, fontWeight: 'bold' },
  follow: { fontSize: 14, color: '#555' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#eee', marginHorizontal: 4 },
  postImage: {
    width: Dimensions.get('window').width / 2 - 40,
    height: 110,
    margin: 5,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  plantCard: { flex: 1, alignItems: 'center' }
});

export default ProfileScreen;
