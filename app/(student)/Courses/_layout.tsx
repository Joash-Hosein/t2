import { DrawerActions } from '@react-navigation/native'
import { Tabs, useNavigation } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

//icons
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'


const DrawerIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 10 }}>
      <Ionicons name="menu" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 16 },
        headerLeft: () => <DrawerIcon />,
        tabBarActiveTintColor: '#FF6B6B',
      }}
    >
       <Tabs.Screen
        name="Course"
        options={{
          title: "Course",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="course_home"
        options={{
           href: null,
          title: "Course Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
    
      <Tabs.Screen
        name="grades"
        options={{
          title: "Grades",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pencil-ruler" size={size} color={color} />
          ),
        }}
      />
     
      <Tabs.Screen
        name="docview"
        options={{
          title: "Document Viewer",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vidplayer"
        options={{
          title: "Video Player",
             href: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="videocam-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="audioplayer"
        options={{
             href: null,
          title: "Audio Player",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" size={size} color={color} />
          ),
        }}
      />
     
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({
  header: {
      backgroundColor: '#324599',
  }
})