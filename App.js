// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

import firebase from './src/firebase';

// Screens
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';
import PasswordRecovery from './src/screens/PasswordRecovery';
import Prefetch from './src/screens/Prefetch';
import CONFIG from './src/config';

export default function App() {

  const [screenId, setScreenId] = useState(-1);

  const loadFont = async () => {
    await Font.loadAsync({
      'Title': require('./assets/fonts/Inkfree.ttf')
    })
  }

  const goToScreen = (id) => {
    setScreenId(id);
  }

  useEffect(() => {
    loadFont();
  }, [])

  let screen = null;

  switch (screenId) {
    case -1:
      screen = <Prefetch goToScreen={goToScreen} screenId={screenId} />
      break;

    case 0:
      screen = <Home goToScreen={goToScreen} screenId={screenId} />
      break;

    case 1:
      screen = <Login goToScreen={goToScreen} screenId={screenId} />
      break;

    case 2:
      screen = <SignUp goToScreen={goToScreen} screenId={screenId} />
      break;

    case 3:
      screen = <Profile goToScreen={goToScreen} screenId={screenId} />
      break;

    case 4:
      screen = <PasswordRecovery goToScreen={goToScreen} screenId={screenId} />
      break;
  }

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: CONFIG.colors.primary }}>
      {screen}
    </View>
  );
}