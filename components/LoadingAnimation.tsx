import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LoadingAnimation = () => {
  const scooterTranslation = useSharedValue(-width); // Start from outside the left of the screen
  const textTranslation = useSharedValue(width); // Start from outside the right of the screen

  useEffect(() => {
    scooterTranslation.value = withTiming(0, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });

    textTranslation.value = withTiming(0, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      delay: 1000,
    });
  }, []);

  const scooterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scooterTranslation.value }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: textTranslation.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scooter, scooterStyle]}>
        <Svg width={150} height={150}>
          <Image
            href={require('../assets/scooter-image.png')}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.textContainer, textStyle]}>
        <Text style={styles.text}>Spin Ex.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scooter: {
    position: 'absolute',
    top: '35%', // Adjust as needed to center the scooter vertically
  },
  textContainer: {
    position: 'absolute',
    top: '50%', // Adjust as needed to position the text below the scooter
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LoadingAnimation;
