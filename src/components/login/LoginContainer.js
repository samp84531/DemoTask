import React from 'react'
import { View, StyleSheet, ImageBackground, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import ModedText from '../typography/ModedText';
import {primaryWhite} from '../../configs/colors';

const LoginContainer = (props) => {
  return (
    <>
    <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backgroundImageStyle} resizeMode="cover" source={require('../../assets/images/login-bg.png')}></ImageBackground>
      <ScrollView keyboardShouldPersistTaps={"handled"} style={{flex: 1}}>
        <View style={{paddingHorizontal: 20, marginTop: 250}}>
          <SafeAreaView>
            {props.children}
          </SafeAreaView>
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // width: '100%',
    // paddingHorizontal: 25,
    backgroundColor: primaryWhite
  },
  mainWrapper: {
    // flex: 1,
  },
  backgroundImageStyle: {
    width: '100%',
    height: 300,
    top: 0,
    position: 'absolute',
    // zIndex: -1
  }
})

export default LoginContainer