import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'


const HeaderRight = ({ image, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      <Image style={styles.imageIconStyle} source={image} resizeMode='contain' />
      {/* <Image style={styles.imageIconStyle} source={require('../../assets/images/bell-icon.png')} resizeMode='contain' /> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  imageIconStyle: {
    width: 30,
    height: 30
  }
})

export default HeaderRight