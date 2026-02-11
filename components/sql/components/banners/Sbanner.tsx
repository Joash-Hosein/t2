import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

const Sbanner = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Pressable style={{ position: 'static', top: 20, left: 50, zIndex: 10, flexDirection: 'row', alignItems: 'center', backgroundColor:'#324599', height: 50 }} onPress={() => (navigation as any).openDrawer()}>
        <Ionicons name="menu" size={28} color="#ffffffff" />  <Image source={require('../../assets/images/foundationsDark.png')} style={styles.image} />
      </Pressable>
    </View>
  )
}

export default Sbanner

const styles = StyleSheet.create({
  image:{
    marginLeft: 10,
    padding: 10,
    width: '28%',
    height: 28,
    resizeMode: 'contain',
  },
})