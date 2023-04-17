import React, {Component, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import Login from './src/components/Login';
import Events from './src/components/Events';
import ListTickets from './src/components/ListTickets';
import AuthLoadingScreen from './src/components/AuthLoadingScreen';
import ScanBarcode from './src/components/ScanBarcode';

import {Text} from 'react-native';
import Splash from './src/components/splash';

const AuthStack = createNativeStackNavigator();
const AppNavigator = createNativeStackNavigator();

const Stack = createNativeStackNavigator();

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [lng, setLng] = useState('ar');
  const {t, i18n} = useTranslation(); // destructure i18n here

  const LanguageBtn = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          setLng(l => {
            if (l == 'ar') {
              return 'en';
            } else {
              return 'ar';
            }
          })
        }>
        {lng == 'ar' ? (
          <Image
            style={styles.icon}
            source={require('./assets/sa.png')}
            resizeMode="cover"
          />
        ) : (
          <Image
            style={styles.icon}
            source={require('./assets/en.png')}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setTimeout(function () {
      setShowSplash(false);
    }, 2000);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  if (showSplash) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoadingScreen">
          <Stack.Screen
            name="تسجيل الدخول"
            component={Login}
            options={{
              headerTitleStyle: {
                fontFamily: 'Cairo-Regular',
              },
              title: t('translations.login'),
              headerRight: () => <LanguageBtn />,
            }}
          />
          <Stack.Screen
            name="المناسبات"
            component={Events}
            options={{
              headerTitleStyle: {
                fontFamily: 'Cairo-Regular',
              },
              title: t('translations.events'),
              headerRight: () => <LanguageBtn />,
            }}
          />
          <Stack.Screen
            name="الحجوزات"
            component={ListTickets}
            options={{
              headerTitleStyle: {
                fontFamily: 'Cairo-Regular',
              },
              title: t('translations.tickets'),
              headerRight: () => <LanguageBtn />,
            }}
          />
          <Stack.Screen
            name="مسح الباركود"
            component={ScanBarcode}
            options={{
              headerTitleStyle: {
                fontFamily: 'Cairo-Regular',
              },
              title: t('translations.scanBarcode'),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,

    backgroundColor: '#c0d6f1',
  },
  icon: {
    width: 32,
    height: 32,
    // borderRadius: 16,
  },
});
