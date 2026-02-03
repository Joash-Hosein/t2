import Homebanner from '@/components/banners/homebanner';
import { SQLiteProvider } from 'expo-sqlite';
import React from 'react';
import {  StyleSheet } from 'react-native';
import Login from '../../components/sql/Login';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const login = () => {
  return (
    <SQLiteProvider
      databaseName="icm.db">
        <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffffff' }}>
        <Homebanner />
      <Login/>
      </SafeAreaView>
      </SafeAreaProvider>
    </SQLiteProvider>
  )
}

export default login

const styles = StyleSheet.create({})