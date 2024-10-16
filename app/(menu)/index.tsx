import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import WelcomeScreen from "@/components/WelcomeScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";  
import LoadingAnimation from "@/components/LoadingAnimation";
import { useColorScheme } from 'react-native';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    const [loadingAppleSignIn, setLoadingAppleSignIn] = useState(false); 
    const [coins, setCoins] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);

    const colorScheme = useColorScheme(); // Получаем текущую цветовую схему

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "264256222540-or7nbototcrpji70jlmag9semhklg942.apps.googleusercontent.com",
        iosClientId: "264256222540-0so4ikl54o31i3og721lvmnfdaamiuq4.apps.googleusercontent.com",
    });

    useEffect(() => {
        // Проверка подключения к интернету
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        checkFirstLaunch();
        handleEffect();
    }, [response, token]);

    useEffect(() => {
        if (userInfo) {
            fetchCoins(userInfo.id);
        }
    }, [userInfo]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    const checkFirstLaunch = async () => {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched) {
            setIsFirstLaunch(false);
        } else {
            await AsyncStorage.setItem("hasLaunched", "true");
            setIsFirstLaunch(true);
        }
    };

    async function handleEffect() {
        const user = await getLocalUser();
        if (!user) {
            if (response?.type === "success") {
                getUserInfo(response.authentication.accessToken);
            }
        } else {
            setUserInfo(user);
        }
    }

    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user");
        if (!data) return null;
        return JSON.parse(data);
    };

    const logRegistration = async (user) => {
        try {
            await fetch('https://spinexcursions.ru:3000/log-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
        } catch (error) {
            console.error('Error logging registration:', error);
        }
    };
    
    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            logRegistration(user);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const resetFirstLaunch = async () => {
        await AsyncStorage.removeItem("hasLaunched");
        setIsFirstLaunch(true);
    };

    const handleAppleSignIn = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            
            const user = {
                id: credential.user,
                name: `${credential.fullName?.givenName} ${credential.fullName?.familyName}`,
                email: credential.email,
                verified_email: true,
                picture: null, 
            };
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (e) {
            if (e.code === 'ERR_CANCELED') {
                console.log('User canceled the sign-in flow');
            } else {
                console.log('Apple sign-in error:', e);
            }
        }
    }

    const fetchCoins = async (userId) => {
        try {
            const response = await fetch(`https://spinexcursions.ru:3000/coins/${userId}`);
            const data = await response.json();
            
            // Update the verification status based on the presence of the phone number
            const verified = data.phone ? "верифицирован" : "не верифицирован";
            
            setCoins(data.coins);
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                verified_email: verified
            }));
        } catch (error) {
            console.error('Error fetching coins:', error);
        }
    };
    

    if (!isConnected) {
        return (
            <SafeAreaView style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
                <View style={[styles.noInternetContainer, colorScheme === 'dark' && styles.darkCard]}>
                    <Ionicons name="wifi" size={80} color={colorScheme === 'dark' ? "#fff" : "#1a73e8"} />
                    <Text style={[styles.noInternetText, colorScheme === 'dark' && styles.darkText]}>Нет доступа к интернету</Text>
                    <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>Проверьте подключение и попробуйте снова</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <LoadingAnimation />
            </View>
        );  
    }

    if (isFirstLaunch) {
        return <WelcomeScreen onDismiss={() => setIsFirstLaunch(false)} />;
    }

    return (
        <SafeAreaView style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
            <View style={[styles.coinContainer, colorScheme === 'dark' && styles.darkCoinContainer]}>
                <Ionicons name="star" size={24} color={colorScheme === 'dark' ? "#fff" : "#4285F4"} />
                <Text style={[styles.coinText, colorScheme === 'dark' && styles.darkCoinText]}>{coins}</Text>
            </View>
            {!userInfo ? (
                <View style={[styles.card, colorScheme === 'dark' && styles.darkCard]}>
                    <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>У вас нет аккаунта</Text>
                    <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>Пожалуйста, пройдите регистрацию через сервисы прикрепленные ниже:</Text>
                    <TouchableOpacity
                        style={styles.googleButton}
                        disabled={!request}
                        onPress={async () => {
                            await promptAsync();
                        }}
                    >
                        <FontAwesome name="google" size={24} color="#fff" style={styles.googleIcon} />
                        <Text style={styles.googleButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.appleButton, { opacity: loadingAppleSignIn ? 0.5 : 1 }]}
                        onPress={handleAppleSignIn}
                        disabled={loadingAppleSignIn}
                    >
                        <FontAwesome name="apple" size={24} color="#fff" style={styles.appleIcon} />
                        <Text style={styles.appleButtonText}>Sign in with Apple</Text>
                    </TouchableOpacity>
                    <Button title="Сбросить первый запуск" onPress={resetFirstLaunch} />
                </View>
            ) : (
                <View style={[styles.card, colorScheme === 'dark' && styles.darkCard]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {userInfo?.picture && <Image source={{ uri: userInfo?.picture }} style={styles.image} />}
                        <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>{userInfo.name}</Text>
                    </View>
                    <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>Почта: {userInfo.email}</Text>
                    <Text style={[styles.text, colorScheme === 'dark' && styles.darkText]}>
                        Верификация: {userInfo.phone_number ? "верифицирован" : "не верифицирован"}
                    </Text>
                    {!userInfo.phone_number && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push('/Verification')}>
                            <Text style={styles.buttonText}>Пройти верификацию</Text>
                        </TouchableOpacity>
                    )}


                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/CreatePost")}>
                        <Text style={styles.buttonText}>Выложить пост</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            await AsyncStorage.removeItem("@user");
                            setUserInfo(null);
                            setCoins(0); 
                        }}>
                        <Text style={styles.buttonText}>Выйти из аккаунта</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f4f7fa",
      paddingHorizontal: 20,
    },
    darkContainer: {
      backgroundColor: "#1c1c1e",
    },
    text: {
      fontSize: 20,
      fontWeight: "600",
      color: "#333",
      textAlign: "center",
      marginBottom: 15,
    },
    darkText: {
      color: "#fff",
    },
    card: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 16,
      paddingHorizontal: 25,
      paddingVertical: 35,
      marginHorizontal: 15,
      marginTop: 60,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 7,
    },
    darkCard: {
      backgroundColor: "#2c2c2e",
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 45,
      marginRight: 14,
      marginBottom: 10,
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ea4335",
      paddingVertical: 16,
      borderRadius: 12,
      marginTop: 25,
      shadowColor: "#ea4335",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    googleIcon: {
      marginRight: 14,
    },
    googleButtonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "bold",
    },
    appleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
      paddingVertical: 16,
      borderRadius: 12,
      marginTop: 25,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    appleIcon: {
      marginRight: 14,
    },
    appleButtonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#1a73e8",
      borderRadius: 12,
      paddingVertical: 16,
      marginTop: 15,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#1a73e8",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "bold",
    },
    coinContainer: {
      position: "absolute",
      top: 30,
      left: 15,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 15,
      borderWidth: 1.5,
      borderColor: "#1a73e8",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 7,
    },
    darkCoinContainer: {
      backgroundColor: "#2c2c2e",
      borderColor: "#fff",
    },
    coinText: {
      fontSize: 20,
      fontWeight: "600",
      marginLeft: 10,
      color: "#1a73e8",
    },
    darkCoinText: {
      color: "#fff",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f7fa",
    },
    darkLoadingContainer: {
      backgroundColor: "#1c1c1e",
    },
    noInternetContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 7,
        backgroundColor: "#fff",
        marginTop: 60,
        paddingVertical: 35,
        marginHorizontal: 15,
    },
    noInternetText: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 20,
        color: "#1a73e8",
    }
  });
