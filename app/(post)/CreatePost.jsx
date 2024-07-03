import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Platform } from 'react-native';

const CreatePostScreen = () => {
  const [newPostText, setNewPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const router = useRouter();

  const addPost = async () => {
    if (newPostText.trim() || selectedImage) {
      const userInfo = await AsyncStorage.getItem("@user");
      const user = userInfo ? JSON.parse(userInfo) : null;
  
      const newPost = {
        text: newPostText,
        image: selectedImage,
        likes: 0,
        dislikes: 0,
        author: user ? { name: user.name, email: user.email, picture: user.picture } : null,
      };
  
      try {
        await axios.post('https://primate-big-alpaca.ngrok-free.app/create-post', newPost);
        setUpdateTrigger(prev => !prev);
      } catch (error) {
        console.error('Failed to save post on server', error);
      }
  
      setNewPostText('');
      setSelectedImage(null);
    }
  };
  
  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response && !response.didCancel && !response.error && response.assets && response.assets.length > 0) {
        const localUri = response.assets[0].uri;
  
        let imageUrl = localUri;
        if (Platform.OS === 'ios' && localUri.startsWith('file://')) {
          try {
            setImageLoading(true);
            const formData = new FormData();
            formData.append('image', {
              uri: localUri,
              type: response.assets[0].type,
              name: response.assets[0].fileName
            });
  
            const uploadResponse = await axios.post('https://primate-big-alpaca.ngrok-free.app/upload-image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
  
            imageUrl = uploadResponse.data.url;
          } catch (error) {
            console.error('Failed to upload image to server:', error);
            setImageLoading(false);
            return;
          } finally {
            setImageLoading(false);
          }
        }
  
        setSelectedImage(imageUrl);
      }
    });
  };

  useEffect(() => {
    if (updateTrigger) {
      router.replace('/AllPosts');
    }
  }, [updateTrigger]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      fontSize: 28,
      marginBottom: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
    },
    input: {
      backgroundColor: '#F0F0F0',
      marginBottom: 20,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
      fontSize: 18,
    },
    imagePickerButton: {
      backgroundColor: '#A9A9A9',
      borderRadius: 10,
      elevation: 2,
      marginBottom: 20,
      paddingVertical: 12,
    },
    imagePickerButtonText: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    selectedImage: {
      width: '100%',
      height: 400,
      marginBottom: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    addButton: {
      backgroundColor: '#333333',
      borderRadius: 10,
      elevation: 2,
      paddingVertical: 12,
    },
    addButtonText: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.header}>Создать Пост</Text>
        <TextInput
          mode="flat"
          placeholder="Опишите ваш пост"
          value={newPostText}
          onChangeText={setNewPostText}
          style={styles.input}
          multiline
          numberOfLines={6}
        />
        <Button
          mode="contained"
          onPress={chooseImage}
          style={styles.imagePickerButton}
          labelStyle={styles.imagePickerButtonText}
        >
          Выбрать изображение
        </Button>
        {imageLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#333333" />
          </View>
        ) : selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : null}
        <Button
          mode="contained"
          onPress={addPost}
          style={styles.addButton}
          labelStyle={styles.addButtonText}
          disabled={imageLoading || (!newPostText.trim() && !selectedImage)}
        >
          Добавить пост
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;