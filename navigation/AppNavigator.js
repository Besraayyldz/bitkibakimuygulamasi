import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Sayfalar
import HomeScreen from '../screens/HomeScreen';
import ShareScreen from '../screens/ShareScreen';
import SearchScreen from '../screens/SearchScreen';
import PlantInfoScreen from '../screens/PlantInfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Tab menüsünü ayrı bir bileşen olarak tanımlıyoruz
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Share':
              iconName = 'add-circle';
              break;
            case 'PlantInfo':
              iconName = 'leaf';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Share" component={ShareScreen} />
      <Tab.Screen name="PlantInfo" component={PlantInfoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 2. Ana bileşeni Stack olarak sarıyoruz
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlantDetail"
        component={PlantDetailScreen}
        options={{ title: 'Bitki Detayı' }}
      />
    </Stack.Navigator>
  );
}
