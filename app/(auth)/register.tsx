import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Homebanner from '../../components/banners/homebanner';
import Register from '../../components/sql/Register';

const registerform = () => {
  return (
    <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffffff' }}>
        <Homebanner/>
      <Register/>
      </SafeAreaView>
      </SafeAreaProvider>
  )
}

export default registerform

const styles = StyleSheet.create({})
