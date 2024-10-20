import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, useColorScheme } from 'react-native';
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
  const colorScheme = useColorScheme();

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

  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Кнопка "Назад" с проверкой на темный режим */}
      <Appbar.BackAction 
        onPress={() => router.back()} 
        style={styles.backButton} 
        color={isDarkMode ? "#fff" : "#000"} // Цвет иконки меняется в зависимости от темы
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}>
        <View style={[styles.postContainer, isDarkMode && styles.darkPostContainer]}>
          <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Выложить пост</Text>
          
          <TextInput
            mode="flat"
            placeholder="Опишите ваш пост"
            value={newPostText}
            onChangeText={setNewPostText}
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholderTextColor={isDarkMode ? "#ccc" : "#666"} 
            multiline
            numberOfLines={5}
            theme={{
              colors: {
                text: isDarkMode ? '#fff' : '#000' // Цвет введенного текста
              }
            }}
          />

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
    backgroundColor: "#f4f7fa",
    paddingHorizontal: 10,
  },
  darkContainer: {
    backgroundColor: "#1c1c1e",
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingVertical: 35,
    marginHorizontal: 15,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 7,
  },
  darkPostContainer: {
    backgroundColor: "#2c2c2e",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  darkTitle: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 1,
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 14,
  },
  darkInput: {
    backgroundColor: "#3a3a3c",
    color: "#FFFFFF",
    borderColor: "#666",
  },
  imagePickerButton: {
    alignItems: "center",
    backgroundColor: "#1a73e8",
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#1a73e8",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  selectedImage: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 15,
  },
  addButton: {
    backgroundColor: "#32a852",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#32a852",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostScreen;
