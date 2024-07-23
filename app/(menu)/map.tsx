import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image, Alert, Button } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OPENWEATHER_API_KEY = 'bccc694fbb70ff0d0782aa792ee610da';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [currentMapType, setCurrentMapType] = useState('standard');
  const [mapTypes] = useState([
    { label: 'Обычная', value: 'standard' },
    { label: 'Гибрид', value: 'hybrid' },
    { label: 'Спутник', value: 'satellite' },
  ]);
  const [isMapTypeModalVisible, setMapTypeModalVisible] = useState(false);
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      await checkUserRegistration();
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert('Location Error', errorMsg);
    }
  }, [errorMsg]);

  const checkUserRegistration = async () => {
    const user = await getLocalUser();
    setIsUserRegistered(!!user);
    if (!user) return;

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    } catch (error) {
      console.error('Error while requesting location permissions or getting location', error);
      setErrorMsg('Error while requesting location permissions or getting location');
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
      Alert.alert('Error', 'Failed to fetch weather data. Please check your API key.');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
    toggleModal();
  };

  const handleModalPress = () => {
    toggleModal();
    navigation.navigate('LocationDetails', {
      title: selectedLocation.title,
      street: selectedLocation.street,
    });
  };

  const goToCurrentLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        1000
      );
    }
  };

  const onMapTypeChange = (value) => {
    setCurrentMapType(value);
  };

  const markers = [
    {
      id: 1,
      coordinate: { latitude: 54.599060, longitude: 52.447626 },
      title: 'Площадь Ленина',
      street: 'Улица: площадь Ленина, Лениногорск, Республика Татарстан'
    },
    {
      id: 2,
      coordinate: { latitude: 54.596539, longitude: 52.454104 },
      title: 'Парк Юбилейный',
      street: 'Республика Татарстан, Лениногорск, парк Юбилейный'
    },
    {
      id: 3,
      coordinate: { latitude: 54.606076, longitude: 52.454188 },
      title: 'Лагуна',
      street: 'Республика Татарстан, Лениногорск, улица Булгакова'
    },
    {
      id: 4,
      coordinate: { latitude: 54.606720, longitude: 52.461817 },
      title: 'Парк Мэхэббэт',
      street: 'Республика Татарстан, Лениногорск, парк Мэхэббэт'
    },
    {
      id: 5,
      coordinate: { latitude: 54.596377, longitude: 52.434611 },
      title: '37-й квартал',
      street: '37-й квартал, Лениногорск, Республика Татарстан'
    }
  ];

  const toggleMapTypeModal = () => {
    setMapTypeModalVisible(!isMapTypeModalVisible);
  };

  const handleMapTypeSelect = (value) => {
    setCurrentMapType(value);
    setMapTypeModalVisible(false);
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

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        mapType={currentMapType}
        showsCompass={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() =>
              handleMarkerPress({
                title: marker.title,
                street: marker.street,
              })
            }
          >
            <Image source={require('../../assets/marker.png')} style={styles.markerImage} />
          </Marker>
        ))}
        <UrlTile
          urlTemplate={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`}
          zIndex={1}
          maximumZ={19}
          flipY={false}
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            opacity: 1,
            borderWidth: 0.8,
            borderColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }}
        />
      </MapView>
        <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
        <Text style={styles.locationButtonText}>Где я?</Text>
      </TouchableOpacity>
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>{weather.name}</Text>
          <Text style={styles.weatherText}>{weather ? `${weather.main.temp}°C` : 'Загрузка...'}</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={styles.weatherIcon}
          />
        </View>
      )}
      <TouchableOpacity style={styles.mapTypePickerButton} onPress={toggleMapTypeModal}>
        <Text style={styles.mapTypePickerButtonText}>Выбрать тип карты</Text>
      </TouchableOpacity>
      <Modal isVisible={isMapTypeModalVisible} onBackdropPress={toggleMapTypeModal}>
        <View style={styles.mapTypeModal}>
          <Text style={styles.mapTypeModalTitle}>Тип карты:</Text>
          {mapTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={styles.mapTypeModalItem}
              onPress={() => handleMapTypeSelect(type.value)}
            >
              <Text>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedLocation.title}</Text>
          <Text style={styles.modalStreet}>{selectedLocation.street}</Text>
          <TouchableOpacity style={styles.moreInfoButton} onPress={handleModalPress}>
            <Text style={styles.moreInfoButtonText}>Подробнее</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
    backgroundColor: 'white',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  locationButton: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
  },
  weatherContainer: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalStreet: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  moreInfoButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  moreInfoButtonText: {
    color: 'white',
    fontSize: 16,
  },
  mapTypePickerButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  mapTypePickerButtonText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  mapTypeModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapTypeModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapTypeModalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notRegisteredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  notRegisteredText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default MapScreen;
