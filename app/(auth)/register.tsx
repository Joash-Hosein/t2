import { SQLiteProvider } from 'expo-sqlite';
import React from 'react';
import { StyleSheet } from 'react-native';
import Register from '../../components/sql/Register';
import Homebanner from '../../components/banners/homebanner';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const registerform = () => {
  return (

    <SQLiteProvider
      databaseName="icm.db">
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffffff' }}>
        <Homebanner/>
      <Register/>
      </SafeAreaView>
      </SafeAreaProvider>
    </SQLiteProvider>
  )
}

export default registerform

const styles = StyleSheet.create({})