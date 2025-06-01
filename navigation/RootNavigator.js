// navigation/RootNavigator.js

import React from 'react';
import { useAuth } from '../components/AuthContext';
import AppNavigator from './AppNavigator'; // Alt menüleri içeren yapı
import AuthNavigator from './AuthNavigator'; // Giriş/kayıt ekranları için

export default function RootNavigator() {
  const { userToken } = useAuth();

  return userToken ? <AppNavigator /> : <AuthNavigator />;
}
