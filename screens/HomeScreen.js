import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  const dummyUsers = [
    { username: "ayse", avatar: "https://i.pravatar.cc/100?img=1" },
    { username: "mehmet", avatar: "https://i.pravatar.cc/100?img=2" },
    { username: "can", avatar: "https://i.pravatar.cc/100?img=3" },
    { username: "zeynep", avatar: "https://i.pravatar.cc/100?img=4" },
    { username: "ahmet", avatar: "https://i.pravatar.cc/100?img=5" },
  ];

  useEffect(() => {
    fetch('http://172.20.10.3:5143/api/posts/feed') // Backend IP ve portunu kontrol et!
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Veri alınamadı:', err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      
      {/* Hikaye Bölümü */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        {dummyUsers.map((user, index) => (
          <View key={index} style={styles.storyBubble}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.storyText}>{user.username}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Gönderiler */}
      {posts.map((post) => (
        <View key={post.id} style={styles.card}>
          <Text style={styles.username}>{post.username}</Text>
          <Image source={{ uri: post.imageUrl }} style={styles.image} />
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  storyBubble: {
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#c1c1c1',
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
  },
  card: {
    backgroundColor: '#f0f0f0',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    height: 250,
    borderRadius: 10,
    marginBottom: 5,
  },
  caption: {
    fontStyle: 'italic',
  },
});
