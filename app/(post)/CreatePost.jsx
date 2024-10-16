import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Appbar } from 'react-native-paper';

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
        await axios.post('https://spinexcursions.ru:3000/create-post', newPost);
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
        setImageLoading(true);
        try {
          const formData = new FormData();
          formData.append('image', {
            uri: localUri,
            type: response.assets[0].type,
            name: response.assets[0].fileName
          });

          const uploadResponse = await axios.post('https://spinexcursions.ru:3000/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          imageUrl = uploadResponse.data.url;
        } catch (error) {
          console.error('Failed to upload image to server:', error);
        } finally {
          setImageLoading(false);
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Кнопка "Назад" */}
      <Appbar.BackAction onPress={() => router.back()} style={styles.backButton} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}>
        <View style={styles.postContainer}>
          {/* Заголовок внутри контейнера */}
          <Text style={styles.title}>Выложить пост</Text>
          
          <TextInput
            mode="flat"
            placeholder="Опишите ваш пост"
            value={newPostText}
            onChangeText={setNewPostText}
            style={styles.input}
            multiline
            numberOfLines={5}
          />

          {/* Изображение отображается здесь */}
          {imageLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#32a852" />
            </View>
          ) : selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : null}

          <Button
            mode="contained"
            onPress={chooseImage}
            style={styles.imagePickerButton}
            labelStyle={styles.imagePickerButtonText}
          >
            Выбрать изображение
          </Button>
          
          <Button
            mode="contained"
            onPress={addPost}
            style={styles.addButton}
            labelStyle={styles.addButtonText}
            disabled={imageLoading || (!newPostText.trim() && !selectedImage)}
          >
            Добавить пост
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff', // Light blue background
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 15, // Rounded corners for the container
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 1,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 14,
  },
  imagePickerButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 15, // Rounded corners
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedImage: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 15, // Rounded corners for the image
  },
  addButton: {
    backgroundColor: '#32a852', // Bright green button
    borderRadius: 15, // Rounded corners
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePostScreen;
