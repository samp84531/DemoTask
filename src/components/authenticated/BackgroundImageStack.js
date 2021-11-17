import React from 'react'
import { ImageBackground, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native'
import { primaryWhite } from '../../configs/colors'


const BackgroundImageStack = (props) => {
  return (
    <>
    <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
      <SafeAreaView style={[styles.container,{paddingTop:Platform.OS == 'android' && 40}]}>
        <ImageBackground
          style={styles.imagebg}
          resizeMode="cover"
          source={require('../../assets/images/authenticated-bg.png')}></ImageBackground>
          {props.children}
      </SafeAreaView>

    </>
  )
}

const styles = StyleSheet.create({
  imagebg: {
    height: 450,
    width: '100%',
    position: "absolute",
    top: 0
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // width: '100%',
    // paddingHorizontal: 25,
    backgroundColor: primaryWhite
  },
  innerScrollViewContainer: {
    //paddingHorizontal: 25,
    // flex: 1
  }
})

export default BackgroundImageStack