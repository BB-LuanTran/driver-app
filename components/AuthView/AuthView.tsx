import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { Text, View } from '../Themed';
import Colors from '@/constants/Colors';
import WebView from 'react-native-webview';
import { useRouter } from 'expo-router';
const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const LoginWebView = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [_isShow, _setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      _setIsShow(true);
    }, 500);
  }, []);

  const handleNavigationStateChange = (newNavState: any) => {
    // Check if the WebView is redirected to a specific URL
    const desiredURL = 'azureAD/callback';
    const currentURL: string = newNavState.url;

    if (currentURL.includes(desiredURL)) {
      // _setIsShow(false);
      setTimeout(() => {
        router.push('/(tabs)/');
      }, 500);
    }
  };

  if (!_isShow) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1, minWidth: '100%', height: 550, padding: 10 }}>
      {isLoading && <ActivityIndicator size="large" />}
      <WebView
        style={{ flex: 1 }}
        onLoad={() => setIsloading(false)}
        source={{
          uri: `${EXPO_PUBLIC_API_URL}/v1/auth/azureAD/login-for-drivers`,
        }}
        domStorageEnabled
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

export default function AuthView() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.light,
  };

  return (
    <View style={{ flex: 1, minHeight: '100%' }}>
      <LoginWebView />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor.background}
      />
    </View>
  );
}
