// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './components/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import UploadImageScreen from './screens/UploadImageScreen';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator /> {/* Kullanıcının giriş durumuna göre ekran gösterir */}
      </NavigationContainer>
    </AuthProvider>
  );
}
