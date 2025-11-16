import React from 'react';
import { View, StatusBar } from 'react-native';
import { InitializationScreen } from './src/screens/InitializationScreen';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <InitializationScreen />
    </View>
  );
}