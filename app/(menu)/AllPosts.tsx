import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator, Text, Button, useColorScheme, RefreshControl } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons } from "@expo/vector-icons"; 
import NetInfo from '@react-native-community/netinfo';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const Post = ({ post, onLike, onDislike }) => {
  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();

  // Функция для сохранения изображения на устройство
  const handleSaveImage = async () => {
    if (!post.image) return;
    
    try {
      // Запрашиваем разрешение на доступ к медиа
      if (permissionStatus?.status !== 'granted') {
        const permissionResponse = await requestPermission();
        if (permissionResponse.status !== 'granted') {
          alert("Необходимо разрешение для сохранения изображений.");
          return;
        }
      }

      const fileUri = FileSystem.cacheDirectory + 'temp_image.jpg';
      
      // Скачиваем изображение в кэш
      const { uri } = await FileSystem.downloadAsync(post.image, fileUri);

      // Сохраняем изображение в галерею устройства
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      
      alert("Изображение успешно сохранено в галерею!");
    } catch (error) {
      console.error("Ошибка при сохранении изображения:", error);
      alert("Не удалось сохранить изображение.");
    }
  };

  const handleLike = () => {
    if (!post.loading && !post.liked) {
      onLike(post.id);
    }
  };

  const handleDislike = () => {
    if (!post.loading && !post.disliked) {
      onDislike(post.id);
    }
  };

  return (
    <Card style={styles.post}>
      <View style={styles.cardContentWrapper}>
        {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
        <Card.Content>
          <View style={styles.userInfo}>
            {post.author_picture && <Image source={{ uri: post.author_picture }} style={styles.userImage} />}
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{post.author_name ? post.author_name : 'Unknown User'}</Text>
              <Text style={styles.userEmail}>{post.author_email ? post.author_email : 'No Email'}</Text>
            </View>
          </View>
          <Text style={styles.postText}>{post.text}</Text>
        </Card.Content>
        <Card.Actions style={styles.postActions}>
          <IconButton
            icon="thumb-up"
            color={post.liked ? '#32a852' : 'grey'}
            size={24}
            onPress={handleLike}
            disabled={post.loading || post.disliked} // блокируем лайк, если дизлайк уже поставлен
          />
          <Text>{post.likes}</Text>
          <IconButton
            icon="thumb-down"
            color={post.disliked ? '#ff3e4d' : 'grey'}
            size={24}
            onPress={handleDislike}
            disabled={post.loading || post.liked} // блокируем дизлайк, если лайк уже поставлен
          />
          <Text>{post.dislikes}</Text>
          {post.loading && <ActivityIndicator size="small" color="#32a852" />}
          {/* Кнопка сохранения изображения */}
          {post.image && (
            <IconButton
            icon={() => <FontAwesome name="save" size={24} color="grey" />} // Иконка сохранения
            onPress={handleSaveImage}
            disabled={post.loading} // Отключаем кнопку при загрузке
            />
          )}
        </Card.Actions>
      </View>
    </Card>
  );
};

const AllPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Добавлено состояние для обновления
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      await checkUserRegistration();
    })();
  }, []);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    const checkRegistration = async () => {
      await checkUserRegistration();
    };
    
    checkRegistration();
  }, []);

  useEffect(() => {
    (async () => {
      const user = await getLocalUser();
      if (user) {
        loadPosts(); // Загружаем посты только если пользователь существует
      } else {
        setLoading(false); // Останавливаем загрузку, если пользователя нет
      }
    })();
  }, []);
  

  const loadPosts = async () => {
    try {
      setLoading(true);
  
      // Получаем email текущего пользователя
      const user = await getLocalUser();
      const userEmail = user ? user.email : null;
      
      if (!userEmail) {
        setLoading(false); // Останавливаем загрузку, если пользователя нет
        return;
      }
  
      const response = await fetch('https://spinexcursions.ru:3000/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      const sortedPosts = data.sort((a, b) => b.id - a.id);
  
      // Загружаем информацию о лайках и дизлайках из AsyncStorage для текущего пользователя
      const likedPosts = JSON.parse(await AsyncStorage.getItem(`@likedPosts_${userEmail}`)) || {};
      const dislikedPosts = JSON.parse(await AsyncStorage.getItem(`@dislikedPosts_${userEmail}`)) || {};
      
      setPosts(sortedPosts.map(post => ({
        ...post,
        liked: likedPosts[post.id] || false,
        disliked: dislikedPosts[post.id] || false,
        loading: false,
      })));
      setLoading(false);
      setRefreshing(false); // Останавливаем анимацию обновления
    } catch (error) {
      console.error('Failed to load posts', error);
      setLoading(false);
      setRefreshing(false); // Останавливаем анимацию обновления
    }
  };
  

  const checkUserRegistration = async () => {
    const user = await getLocalUser();
    setIsUserRegistered(!!user);
  };

  const handleLike = async (postId) => {
    try {
      // Получаем email текущего пользователя
      const user = await getLocalUser();
      const userEmail = user ? user.email : null;
      if (!userEmail) throw new Error("User not logged in");
  
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, loading: true } : post
        )
      );
  
      const response = await fetch(`https://spinexcursions.ru:3000/posts/${postId}/like`, {
        method: 'POST',
      });      
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
  
      // Сохраняем информацию о лайке в AsyncStorage для текущего пользователя
      const likedPosts = JSON.parse(await AsyncStorage.getItem(`@likedPosts_${userEmail}`)) || {};
      likedPosts[postId] = true;
      await AsyncStorage.setItem(`@likedPosts_${userEmail}`, JSON.stringify(likedPosts));
  
      // Обновляем состояние постов
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, liked: true, disliked: false, loading: false } : post
        )
      );
      
      // Удаляем дизлайк, если он был
      const dislikedPosts = JSON.parse(await AsyncStorage.getItem(`@dislikedPosts_${userEmail}`)) || {};
      delete dislikedPosts[postId];
      await AsyncStorage.setItem(`@dislikedPosts_${userEmail}`, JSON.stringify(dislikedPosts));
  
    } catch (error) {
      console.error('Error liking post:', error);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, loading: false } : post
        )
      );
    }
  };

  const handleDislike = async (postId) => {
    try {
      // Получаем email текущего пользователя
      const user = await getLocalUser();
      const userEmail = user ? user.email : null;
      if (!userEmail) throw new Error("User not logged in");
  
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, loading: true } : post
        )
      );
  
      const response = await fetch(`https://spinexcursions.ru:3000/posts/${postId}/dislike`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to dislike post');
      }
  
      // Сохраняем информацию о дизлайке в AsyncStorage для текущего пользователя
      const dislikedPosts = JSON.parse(await AsyncStorage.getItem(`@dislikedPosts_${userEmail}`)) || {};
      dislikedPosts[postId] = true;
      await AsyncStorage.setItem(`@dislikedPosts_${userEmail}`, JSON.stringify(dislikedPosts));
  
      // Обновляем состояние постов
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, disliked: true, liked: false, loading: false } : post
        )
      );
      
      // Удаляем лайк, если он был
      const likedPosts = JSON.parse(await AsyncStorage.getItem(`@likedPosts_${userEmail}`)) || {};
      delete likedPosts[postId];
      await AsyncStorage.setItem(`@likedPosts_${userEmail}`, JSON.stringify(likedPosts));
  
    } catch (error) {
      console.error('Error disliking post:', error);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, loading: false } : post
        )
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Запускаем анимацию обновления
    loadPosts(); // Загружаем посты заново
  };

  if (!isConnected) {
    return (
      <SafeAreaView style={[styles.container1, colorScheme === 'dark' && styles.darkContainer]}>
        <View style={[styles.noInternetContainer, colorScheme === 'dark' && styles.darkCard]}>
          <Ionicons name="wifi" size={80} color={colorScheme === 'dark' ? "#fff" : "#1a73e8"} />
          <Text style={[styles.noInternetText, colorScheme === 'dark' && styles.darkText]}>Нет доступа к интернету</Text>
          <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>Пожалуйста, проверьте ваше интернет-соединение и повторите попытку.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isUserRegistered) {
    return (
      <SafeAreaView style={styles.notRegisteredContainer}>
        <Text style={styles.notRegisteredText}>У вас нет аккаунта</Text>
        <Text style={styles.notRegisteredText}>Пожалуйста, пройдите регистрацию</Text>
        <Button title='Обновить' onPress={checkUserRegistration} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      {loading ? (
        <ActivityIndicator size="large" color="#32a852" />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Post
              post={item}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          )}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Добавлен функционал обновления
          }
        />
      )}
    </SafeAreaView>
  );
};

const getLocalUser = async () => {
  const data = await AsyncStorage.getItem('@user');
  if (!data) return null;
  return JSON.parse(data);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    alignSelf: 'center', 
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'visible',
    elevation: 3,
    width: '95%',
    backgroundColor: '#ffffff',
  },
  cardContentWrapper: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  userInfoText: {
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#004d4d',
  },
  userEmail: {
    color: '#808080',
    fontSize: 14,
  },
  postText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#003333',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notRegisteredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  notRegisteredText: {
    fontSize: 18,
    textAlign: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: "#f4f7fa",
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: "#1c1c1e",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  darkText: {
    color: "#fff",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingVertical: 35,
    marginHorizontal: 15,
    marginTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 7,
  },
  darkCard: {
    backgroundColor: "#2c2c2e",
  },
  noInternetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 7,
    backgroundColor: "#fff",
    marginTop: 60,
    paddingVertical: 35,
    marginHorizontal: 15,
},
noInternetText: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    color: "#1a73e8",
}
});

export default AllPostsScreen;
