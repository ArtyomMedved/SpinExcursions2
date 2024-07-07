import React from 'react';
import LottieView from 'lottie-react-native';

const WeatherAnimation = ({ animationSource }) => {
  return <LottieView source={animationSource} autoPlay loop />;
};

export default WeatherAnimation;