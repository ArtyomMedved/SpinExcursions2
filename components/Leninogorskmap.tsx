import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';

const LeninogorskMap = () => {
    const region = {
        latitude: 54.599028, // Центр Лениногорска
        longitude: 52.442676,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

  // Пример координат для границы города Лениногорск (это пример, координаты могут быть неточными)
  const boundaryCoordinates = [
    { latitude: 54.616806, longitude: 52.427628 },
    { latitude: 54.610131, longitude: 52.425396 },
    { latitude: 54.591095, longitude: 52.400849 },
    { latitude: 54.580228, longitude: 52.406857 },
    { latitude: 54.578134, longitude: 52.411148 },
    { latitude: 54.577236, longitude: 52.403252 },
    { latitude: 54.575641, longitude: 52.405655 },
    { latitude: 54.572848, longitude: 52.407543 },
    { latitude: 54.565268, longitude: 52.419388 },
    { latitude: 54.562973, longitude: 52.432091 },
    { latitude: 54.563472, longitude: 52.445996 },
    { latitude: 54.564869, longitude: 52.461102 }, 
    { latitude: 54.563073, longitude: 52.466423 },
    { latitude: 54.563472, longitude: 52.469341 },
    { latitude: 54.566018, longitude: 52.467724 },
    { latitude: 54.567005, longitude: 52.474858 },
    { latitude: 54.568140, longitude: 52.475028 },
    { latitude: 54.569719, longitude: 52.477236 },
    { latitude: 54.571100, longitude: 52.478679 },
    { latitude: 54.571446, longitude: 52.480972 },
    { latitude: 54.571749, longitude: 52.480942 },
    { latitude: 54.572671, longitude: 52.481887 },
    { latitude: 54.572522, longitude: 52.481453 },
    { latitude: 54.572674, longitude: 52.481249 },
    { latitude: 54.573082, longitude: 52.477113 },
    { latitude: 54.576164, longitude: 52.477837 },
    { latitude: 54.576934, longitude: 52.475426 },
    { latitude: 54.575533, longitude: 52.469639 },
    { latitude: 54.574203, longitude: 52.470363 },
    { latitude: 54.573292, longitude: 52.471809 },
    { latitude: 54.571100, longitude: 52.478679 },
    { latitude: 54.568810, longitude: 52.467952 },
    { latitude: 54.569580, longitude: 52.462045 },
    { latitude: 54.572872, longitude: 52.461201 },
    { latitude: 54.576654, longitude: 52.455054 },
    { latitude: 54.581485, longitude: 52.463612 },
    { latitude: 54.585966, longitude: 52.465300 },
    { latitude: 54.586667, longitude: 52.468916 },
    { latitude: 54.588067, longitude: 52.472171 },
    { latitude: 54.586457, longitude: 52.472533 },
    { latitude: 54.586457, longitude: 52.475305 },
    { latitude: 54.588907, longitude: 52.474943 },
    { latitude: 54.587647, longitude: 52.478198 },
    { latitude: 54.589747, longitude: 52.482176 },
    { latitude: 54.590937, longitude: 52.481091 },
    { latitude: 54.593037, longitude: 52.488686 },
    { latitude: 54.587507, longitude: 52.499896 },
    { latitude: 54.594227, longitude: 52.500860 },
    { latitude: 54.595417, longitude: 52.507008 },
    { latitude: 54.594227, longitude: 52.507490 },
    { latitude: 54.594857, longitude: 52.517013 },
    { latitude: 54.597377, longitude: 52.520750 },
    { latitude: 54.601576, longitude: 52.520148 },
    { latitude: 54.620467, longitude: 52.473135 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
      >
        <Polygon
          coordinates={boundaryCoordinates}
          strokeColor="blue" // Граница синего цвета
          fillColor="rgba(135, 206, 250, 0.13)" // Полупрозрачный синий
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  map: {
    flex: 0,
  },
});

export default LeninogorskMap;
