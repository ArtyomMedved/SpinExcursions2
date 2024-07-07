import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import uuid from 'uuid-js';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';


const SECRET_KEY = 'test_AuJsuu_1Akmyg3Vzy7DCq-ob_jhDlAR-jqiIZep0ViY';
const SHOP_ID = '401474';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OPENWEATHER_API_KEY = 'bccc694fbb70ff0d0782aa792ee610da';
const GOOGLE_MAPS_APIKEY = 'AIzaSyChiFJsHXD6u1ymneTtBMFC5JlYs_sX6hY';

const MapScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [timer, setTimer] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const [routeDuration, setRouteDuration] = useState(null);
  const [isMapTypeModalVisible, setMapTypeModalVisible] = useState(false);
  const [currentMapType, setCurrentMapType] = useState('standard');
  const [mapTypes] = useState([
    { label: 'Обычная', value: 'standard' },
    { label: 'Гибрид', value: 'hybrid' },
    { label: 'Спутник', value: 'satellite' },
  ]);
  const [isNavigating, setIsNavigating] = useState(false);

  const navigation = useNavigation();
  const mapRef = useRef(null);

  const attractions = [
    {
      id: 1,
      title: 'парк культуры и отдыха имени Горького',
      coordinates: {
        latitude: 54.608500,
        longitude: 52.448803,
      },
    },
    {
      id: 2,
      title: 'озеро Нижнее',
      coordinates: {
        latitude: 54.605976,
        longitude: 52.455149,
      },
    },
    {
      id: 3,
      title: 'парк Мэхэббэт',
      coordinates: {
        latitude: 54.606630,
        longitude: 52.461796,
      },
    },
    {
      id: 4,
      title: 'Фантан нефти',
      coordinates: {
        latitude: 54.604793,
        longitude: 52.451907,
      },
    },
    {
      id: 5,
      title: 'озеро Верхнее',
      coordinates: {
        latitude: 54.603199,
        longitude: 52.432841,
      },
    },
    {
      id: 6,
      title: 'Вечный огонь',
      coordinates: {
        latitude: 54.602850,
        longitude: 52.455575,
      },
    },
    {
      id: 7,
      title: 'Парк Победы',
      coordinates: {
        latitude: 54.601189,
        longitude: 52.458581,
      },
    },
    {
      id: 8,
      title: 'парк Юбилейный',
      coordinates: {
        latitude: 54.596617,
        longitude: 52.454705,
      },
    },
    {
      id: 9,
      title: 'Центральная аллея',
      coordinates: {
        latitude: 54.602428,
        longitude: 52.448443,
      },
    },
  ];

  useEffect(() => {
    (async () => {
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
            if (isNavigating && newLocation.coords.latitude && newLocation.coords.longitude) {
              setOrigin({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
              });
            }
          }
        );
      } catch (error) {
        console.error('Error while requesting location permissions or getting location', error);
        setErrorMsg('Error while requesting location permissions or getting location');
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather(location.coords.latitude, location.coords.longitude);
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert('Location Error', errorMsg);
    }
  }, [errorMsg]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
      if (timer % 60 === 0) {
        setEarnings((prevEarnings) => prevEarnings + 5);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    if (routeDuration && !isSpeaking) {
      setIsSpeaking(true);
      Speech.speak(`До конца маршрута ${routeDuration} минут`);
    }
  }, [routeDuration]);

  useEffect(() => {
    if (isRouteVisible && !isNavigating) {
      setIsNavigating(true);
      Speech.speak(`Вы приехали`);
    }
  }, [isRouteVisible]);

  useEffect(() => {
    const speakingTimer = setTimeout(() => {
      setIsSpeaking(false);
    }, 3000); // Задержка в миллисекундах до сброса состояния
  
    return () => clearTimeout(speakingTimer);
  }, [isSpeaking]);
  

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);

      if (response.data.weather && response.data.weather.length > 0) {
        const iconCode = response.data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        setWeatherIcon(iconUrl);
      }
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
    setDestination({
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    });
    setIsRouteVisible(true);
  
    // Подстройка зума
    if (mapRef.current && location && origin) {
      mapRef.current.fitToCoordinates(
        [
          {
            latitude: origin.latitude,
            longitude: origin.longitude,
          },
          {
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
          },
        ],
        {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
          animated: true,
        }
      );
    }
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

  const generatePedestrianRoute = async () => {
    if (!location) {
      Alert.alert('Location Error', 'Could not determine your current location.');
      return;
    }

    const randomAttraction = attractions[Math.floor(Math.random() * attractions.length)];
    const { latitude, longitude } = randomAttraction.coordinates;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${location.coords.latitude},${location.coords.longitude}&destination=${latitude},${longitude}&mode=walking&key=${GOOGLE_MAPS_APIKEY}`
      );

      if (response.data.status === 'OK') {
        const { routes } = response.data;
        if (routes.length > 0) {
          const { legs } = routes[0];
          const { start_location, end_location, duration } = legs[0];
          setOrigin({
            latitude: start_location.lat,
            longitude: start_location.lng,
          });
          setDestination({
            latitude: end_location.lat,
            longitude: end_location.lng,
          });
          setRouteDuration(duration.text);
          setIsRouteVisible(true);
        } else {
          Alert.alert('Route Error', 'No pedestrian route found.');
        }
      } else {
          Alert.alert('Route Error', `Failed to fetch pedestrian route: ${response.data.error_message}`);
      }
    } catch (error) {
      console.error('Error fetching route data', error);
      Alert.alert('Error', 'Failed to fetch route data. Please try again.');
    }
  };

  const finishTrip = () => {
    setShowConfirmation(true);
  };

  const confirmFinishTrip = async () => {
    setShowConfirmation(false);
    try {
      const idempotenceKey = uuid.create().toString();

      const response = await axios.post('https://api.yookassa.ru/v3/payments', {
        amount: {
          value: earnings.toString(),
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: 'spinexapp://home',
        },
        capture: true,
        description: 'Оплата поездки',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': idempotenceKey,
        },
        auth: {
          username: SHOP_ID,
          password: SECRET_KEY,
        },
      });

      console.log('Payment response:', response.data);
      const paymentUrl = response.data.confirmation.confirmation_url;

      navigation.push('PaymentWebView', { url: paymentUrl });

    } catch (error) {
      console.error('Payment Error', error);
      Alert.alert('Payment Error', 'Failed to complete payment. Please try again.');
    }
  };

  const cancelFinishTrip = () => {
    setShowConfirmation(false);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleMapTypeModal = () => {
    setMapTypeModalVisible(!isMapTypeModalVisible);
  };

  const handleMapTypeSelect = (value) => {
    setCurrentMapType(value);
    setMapTypeModalVisible(false);
  };

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
        {attractions.map((attraction, index) => (
          <Marker
            key={index}
            coordinate={attraction.coordinates}
            title={attraction.title} // исправлено на title
            description={attraction.description} // добавлено для наглядности
            onPress={() => handleMarkerPress(attraction)}
          />
        ))}
        {isRouteVisible && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="blue"
            mode="WALKING"
            onReady={(result) => {
              const roundedDuration = Math.round(result.duration);
              setRouteDuration(roundedDuration);
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 20,
                  bottom: 20,
                  left: 20,
                  top: 20,
                },
              });
            }}
          />
        )}
      </MapView>
  
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>{`${weather.main.temp}°C`}</Text>
          {weatherIcon && <Image source={{ uri: weatherIcon }} style={styles.weatherIcon} />}
          <Text style={styles.weatherText}>{weather.weather[0].description}</Text>
        </View>
      )}
  
      <TouchableOpacity style={styles.buttonCenter} onPress={goToCurrentLocation}>
        <FontAwesome6 name="location-crosshairs" size={24} color="black" />
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.buttonRandomRoute} onPress={generatePedestrianRoute}>
        <Text style={styles.buttonText}>Случайный маршрут</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.buttonMapType} onPress={toggleMapTypeModal}>
        <Text style={styles.buttonTextMapType}>Выбрать тип карты</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.buttonFinishTrip} onPress={finishTrip}>
        <Text style={styles.buttonText}>Завершить поездку</Text>
      </TouchableOpacity>
  
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Время: {formatTime(timer)}</Text>
        <Text style={styles.infoText}>Заработок: {earnings}₽</Text>
        {routeDuration && <Text style={styles.infoText}>маршрут: {routeDuration} мин.</Text>}
      </View>
  
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedLocation.title}</Text> {/* исправлено на title */}
          <Text style={styles.modalDescription}>{selectedLocation.description}</Text> {/* добавлено для наглядности */}
          <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
            <Text style={styles.modalButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  
      <Modal isVisible={showConfirmation}>
        <View style={styles.confirmationModalContent}>
          <Text style={styles.confirmationTitle}>Завершить поездку?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmFinishTrip}>
              <Text style={styles.confirmButtonText}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelFinishTrip}>
              <Text style={styles.cancelButtonText}>Нет</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  
      <Modal isVisible={isMapTypeModalVisible}>
        <View style={styles.mapTypeModalContent}>
          {mapTypes.map((type) => (
            <TouchableOpacity key={type.value} style={styles.mapTypeButton} onPress={() => handleMapTypeSelect(type.value)}>
              <Text style={styles.mapTypeButtonText}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0', // Цвет фона контейнера
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonCenter: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'white', // Синий цвет
    paddingVertical: 10, // Увеличено для большего пространства внутри кнопки
    paddingHorizontal: 10, // Увеличено для большего пространства внутри кнопки
    borderRadius: 10,
    marginVertical: 8, // Увеличено расстояние между кнопками
    elevation: 3, // Тень для приподнятого эффекта
  },
  buttonRandomRoute: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    backgroundColor: '#007AFF', // Синий цвет
    paddingVertical: 12, // Увеличено для большего пространства внутри кнопки
    paddingHorizontal: 20, // Увеличено для большего пространства внутри кнопки
    borderRadius: 8,
    marginVertical: 8, // Увеличено расстояние между кнопками
    elevation: 3, // Тень для приподнятого эффекта
  },
  buttonMapType: {
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
  buttonTextMapType: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonFinishTrip: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#FF3B30', // Красный цвет
    paddingVertical: 12, // Увеличено для большего пространства внутри кнопки
    paddingHorizontal: 20, // Увеличено для большего пространства внутри кнопки
    borderRadius: 8,
    marginVertical: 8, // Увеличено расстояние между кнопками
    elevation: 3, // Тень для приподнятого эффекта
  },
  infoContainer: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Легкий прозрачный белый цвет
    borderRadius: 10,
    padding: 12, // Увеличено для большего пространства внутри контейнера
    elevation: 3, // Тень для приподнятого эффекта
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', // Цвет текста
  },
  weatherContainer: {
    position: 'absolute',
    top: 35,
    right: 10, // Немного сдвинуто вправо для лучшего выравнивания
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Легкий прозрачный белый цвет
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3, // Тень для приподнятого эффекта
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333', // Цвет текста
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  modalContent: {
    backgroundColor: '#FFFFFF', // Белый цвет
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4, // Более выраженная тень для модального окна
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Цвет текста
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666', // Цвет текста
  },
  modalButton: {
    backgroundColor: '#007AFF', // Синий цвет
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3, // Тень для приподнятого эффекта
  },
  modalButtonText: {
    color: '#FFFFFF', // Цвет текста
    fontSize: 16,
  },
  confirmationModalContent: {
    backgroundColor: '#FFFFFF', // Белый цвет
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4, // Более выраженная тень для модального окна
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Цвет текста
  },
  confirmationButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4CD964', // Зеленый цвет
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 3, // Тень для приподнятого эффекта
  },
  confirmButtonText: {
    color: '#FFFFFF', // Цвет текста
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF3B30', // Красный цвет
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 3, // Тень для приподнятого эффекта
  },
  cancelButtonText: {
    color: '#FFFFFF', // Цвет текста
    fontSize: 16,
  },
  mapTypeModalContent: {
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
  mapTypeButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  mapTypeButtonText: {
    color: 'black', // Цвет текста
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  }
});

export default MapScreen;