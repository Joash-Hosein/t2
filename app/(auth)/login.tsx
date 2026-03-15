import Homebanner from '@/components/banners/homebanner';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Login from '../../components/sql/Login';

const login = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffffff' }}>
        <Homebanner />
      <Login/>
      </SafeAreaView>
      </SafeAreaProvider>
  )
}

export default login

const styles = StyleSheet.create({})
