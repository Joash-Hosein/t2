import CustomText from '@/components/banners/CustomText'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Sbanner from '../../components/banners/Sbanner'
import UserInfo from '../../components/sql/UserInfo'
const dashboard = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <Sbanner />
      <CustomText variant='heading' style={{alignSelf: 'center'}}>
         Hi, Welcome to ICM learning and Resource Application
      </CustomText>
      <View style={styles.container}>
        <CustomText variant='body'>
          Let's Learn!
        </CustomText>
        <UserInfo />
        <Link href="https://icm.org" style={styles.card}>   
        <CustomText variant='body' style={{alignSelf: 'center', color: 'white'}}>
          Click Here for more about ICM
        </CustomText>
         </Link>
        
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default dashboard

const styles = StyleSheet.create({
  Safecontainer:{
    flex: 1,
  },
    container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    margin: 10
  },
  card: {
    backgroundColor: '#324599',
    padding: 10,
    borderRadius: 6,
    width: '80%',
    justifyContent: 'center',
    height: 'auto',
    alignItems: 'center',
    textAlign: 'center'
  }
})