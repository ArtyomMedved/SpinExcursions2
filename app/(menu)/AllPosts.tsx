import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator, Text, Button } from 'react-native';
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
            color={post.liked ? 'blue' : 'grey'}
            size={24}
            onPress={handleLike}
            disabled={post.liked || post.loading}
          />
          <Text>{post.likes}</Text>
          <IconButton
            icon="thumb-down"
            color={post.disliked ? 'red' : 'grey'}
            size={24}
            onPress={handleDislike}
            disabled={post.disliked || post.loading}
          />
          <Text>{post.dislikes}</Text>
          {post.loading && <ActivityIndicator size="small" color="#0000ff" />}
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
        <Text style={styles.notRegisteredText}>У вас нет аккаунта</Text>
        <Text style={styles.notRegisteredText}>Пожалуйста, пройдите регистрацию</Text>
        <Button title='Обновить' onPress={checkUserRegistration} />
      </View>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'visible',
    elevation: 2,
    width: '100%',
  },
  cardContentWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfoText: {
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userEmail: {
    color: 'grey',
  },
  postText: {
    marginBottom: 10,
    fontSize: 16,
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