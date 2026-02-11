import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const homebanner = () => {
  return (
    <View style={styles.banner}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        <Link href="/" style={styles.link}>
          <Image source={require('../../assets/images/foundationsDark.png')} style={styles.image} />
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        <Link href="/login" style={styles.link}>
          <MaterialCommunityIcons name="account-circle" size={24} color="white" />
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: '8%',
    backgroundColor: '#324599',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  image:{
    width: '60%',
    height: 60,
    resizeMode: 'contain',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default homebanner;
