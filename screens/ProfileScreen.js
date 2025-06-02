import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const ProfileScreen = () => {
  const user = {
    name: 'Kullanıcı Adı',
    followers: 15,
    following: 32,
    image: require('../assets/icon.png'), // örnek resim
  };

  const posts = [
    { id: '1', image: require('../assets/icon.png') },
    { id: '2', image: require('../assets/icon.png') },
    { id: '3', image: require('../assets/icon.png') },
    { id: '4', image: require('../assets/icon.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={user.image} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.follow}>Takipçi: {user.followers}  Takip: {user.following}</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}><Text>Teklif</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text>Bitkilerim</Text></TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.postImage} />
        )}
      />
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
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#eee' },
  postImage: {
    width: Dimensions.get('window').width / 2 - 20,
    height: 150,
    margin: 5,
    borderRadius: 10,
  },
});

export default ProfileScreen;
