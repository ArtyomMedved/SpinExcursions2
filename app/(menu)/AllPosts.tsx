import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator, Text, Button, useColorScheme } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Post = ({ post, onLike, onDislike }) => {
  const handleLike = () => {
    if (!post.liked && !post.loading) {
      onLike(post.id);
    }
  };

  const handleDislike = () => {
    if (!post.disliked && !post.loading) {
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
            color={post.liked ? '#32a852' : 'grey'} // Bright green for liked
            size={24}
            onPress={handleLike}
            disabled={post.liked || post.loading}
          />
          <Text>{post.likes}</Text>
          <IconButton
            icon="thumb-down"
            color={post.disliked ? '#ff3e4d' : 'grey'} // Red for disliked
            size={24}
            onPress={handleDislike}
            disabled={post.disliked || post.loading}
          />
          <Text>{post.dislikes}</Text>
          {post.loading && <ActivityIndicator size="small" color="#32a852" />}
        </Card.Actions>
      </View>
    </Card>
  );
};

const AllPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [dislikedPosts, setDislikedPosts] = useState(new Set());
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const colorScheme = useColorScheme(); // Получаем текущую цветовую схему

  useEffect(() => {
    (async () => {
      await checkUserRegistration();
    })();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('https://primate-big-alpaca.ngrok-free.app/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.map(post => ({
          ...post,
          liked: likedPosts.has(post.id),
          disliked: dislikedPosts.has(post.id),
          loading: false,
        })));
        setLoading(false);
      } catch (error) {
        console.error('Failed to load posts', error);
        setLoading(false);
      }
    };

    loadPosts();
  }, [likedPosts, dislikedPosts]);

  const checkUserRegistration = async () => {
    const user = await getLocalUser();
    setIsUserRegistered(!!user);
  };

  const handleLike = async (postId) => {
    try {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, loading: true } : post
        )
      );

      const response = await fetch(`https://primate-big-alpaca.ngrok-free.app/posts/${postId}/like`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
      const updatedPost = await response.json();
      setLikedPosts(prevLikedPosts => new Set([...prevLikedPosts, updatedPost.id]));
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
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, loading: true } : post
        )
      );

      const response = await fetch(`https://primate-big-alpaca.ngrok-free.app/posts/${postId}/dislike`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to dislike post');
      }
      const updatedPost = await response.json();
      setDislikedPosts(prevDislikedPosts => new Set([...prevDislikedPosts, updatedPost.id]));
    } catch (error) {
      console.error('Error disliking post:', error);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, loading: false } : post
        )
      );
    }
  };

  if (!isUserRegistered) {
    return (
      <View style={styles.notRegisteredContainer}>
        <Text style={[styles.notRegisteredText, { color: colorScheme === 'dark' ? '#ffffff' : '#004d4d' }]}>
          У вас нет аккаунта
        </Text>
        <Text style={[styles.notRegisteredText, { color: colorScheme === 'dark' ? '#ffffff' : '#004d4d' }]}>
          Пожалуйста, пройдите регистрацию
        </Text>
        <Button title='Обновить' onPress={checkUserRegistration} color='#32a852' />
      </View>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#e6f7ff' }]}>
        <ActivityIndicator size="large" color="#32a852" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#e6f7ff' }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <Post
            post={{ ...item, loading: false }}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        )}
      />
    </SafeAreaView>
  );
};

const getLocalUser = async () => {
  const data = await AsyncStorage.getItem("@user");
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
});

export default AllPostsScreen;
