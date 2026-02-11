import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Importing icon library
import Feather from '@expo/vector-icons/Feather';

const _layout = () => {
  const { userId, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userId) {
      router.replace('/login');
    }
  }, [userId, isLoading, router]);

  if (isLoading) {
    return null; // Or a loading screen
  }

  if (!userId) {
    return null; // Prevent rendering if not logged in
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
        title: 'Progress Tracker',
        drawerIcon: ({color, size}: {color: string, size: number}) => (
          <Feather name="pie-chart" size={size} color="#324599" />
        ), }}
      />
      <Drawer.Screen name="logout" options={{
        title: 'Logout',
        drawerIcon: ({color, size}: {color: string, size: number}) => (
          <Feather name="log-out" size={size} color="#324599" />
        ), }}
      />

      </Drawer>
  )
}

export default _layout
