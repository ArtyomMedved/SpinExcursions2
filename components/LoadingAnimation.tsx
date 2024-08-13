import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LoadingAnimation = () => {
  const scooterTranslation = useSharedValue(-width); // Start from outside the left of the screen
  const scooterRotation = useSharedValue(0);
  const textTranslation = useSharedValue(width); // Start from outside the right of the screen
  const textOpacity = useSharedValue(0);

  const colorScheme = useColorScheme();

  useEffect(() => {
    // Animate the scooter entering
    scooterTranslation.value = withTiming(0, {
      duration: 1200,
      easing: Easing.inOut(Easing.ease),
    });

    scooterRotation.value = withTiming(5, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });

    // Animate the text entering with a delay
    textTranslation.value = withTiming(0, {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      delay: 1300,
    });

    textOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      delay: 1300,
    });
  }, []);

  const scooterStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: scooterTranslation.value },
        { rotate: `${scooterRotation.value}deg` }
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: textTranslation.value }],
      opacity: textOpacity.value,
    };
  });

  return (
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
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
  darkContainer: {
    backgroundColor: "#1c1c1e",
  },
  scooter: {
    position: 'absolute',
    top: '35%',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LoadingAnimation;