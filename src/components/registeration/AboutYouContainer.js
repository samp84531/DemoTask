import React from 'react'
import { View, KeyboardAvoidingView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import { primaryWhite } from '../../configs/colors'
import Heading from './Heading'
import ScrollableAvoidKeyboard from '../ScrollableAvoidKeyboard'
const AboutYouContainer = ({ children }) => {
  return (
    <ImageBackground style={styles.backgroundImage} resizeMode='cover' source={require('../../assets/images/about-you-bg.png')}>
      <SafeAreaView style={{flex:1}}>
    
        <View style={styles.safeview}>
          <Heading primary='about you' secondary="let's get your profile up" />
          {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 400,
    flex: 1,
    backgroundColor: primaryWhite
  },
  safeview: {
    marginTop: 200,
    paddingHorizontal: 20,
    flex:1
  }
})

export default AboutYouContainer