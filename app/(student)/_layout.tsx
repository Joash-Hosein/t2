import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Importing icon library
import Feather from '@expo/vector-icons/Feather';

const _layout = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Drawer screenOptions={{
        headerStyle: { backgroundColor: '#324599' },
        drawerAllowFontScaling: false,
        drawerLabelStyle: { fontSize: 15, fontFamily: 'Inter_400Regular' },
        drawerActiveBackgroundColor: '#c1d8ffff',
        drawerActiveTintColor: '#2f2e36ff',
        drawerInactiveTintColor: '#000',
        drawerStatusBarAnimation: 'slide',
        swipeEdgeWidth: 200,
        drawerHideStatusBarOnOpen: true,
        drawerType: 'slide',
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 18 },
      }}>
      <Drawer.Screen name="dashboard" options={{
        title: 'Dashboard',
        drawerIcon: ({color, size}: {color: string, size: number}) => (
          <Feather name="home" size={size} color="#324599"  />
        ), }}
      />
      <Drawer.Screen name="Courses" options={{
        title: 'Course Information',
        drawerIcon: ({color, size}: {color: string, size: number}) => (
          <Feather name="book-open" size={size} color="#324599" />
        ), }}/>
      <Drawer.Screen name="progresstracker" options={{
        drawerItemStyle: { display: 'none' },
        title: 'Progress Tracker',
        drawerIcon: ({color, size}: {color: string, size: number}) => (
          <Feather name="pie-chart" size={size} color="#324599" />
        ), }}
      />

    </Drawer>
  )
}

export default _layout
