import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
  Text,
  StatusBar,
  ImageBackground,Dimensions
} from 'react-native';
import Heading from '../registeration/Heading';
import Fonts from '../../configs/fonts';
import {primaryGreen, primaryWhite, primaryGreenLight} from '../../configs/colors';
import ModedText from '../typography/ModedText';
const SCREEN_WIDTH = Dimensions.get("window").width;
const Loader = props => {
  const {loading, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {/* <StatusBar backgroundColor="white" /> */}
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require('../../assets/images/about-you-bg.png')}></ImageBackground>
        <View style={styles.container}>
          <ModedText style={styles.secondary}>{'just a moment'}</ModedText>
          <ModedText style={styles.primary}>
            {"we're curating your profile"}
          </ModedText>
          <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',width:SCREEN_WIDTH *0.76}}>
            <View style={styles.borderBottomPrimary} />
            <View style={styles.borderBottomLight} />
            <View style={styles.borderBottomLight} />
            <View style={styles.borderBottomLight} />
            <View style={styles.borderBottomLight} />
            <View style={styles.borderBottomLight} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    // flex: 1,
    backgroundColor: primaryWhite,
  },
  secondary: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: Fonts.Light,
  },
  primary: {
    fontSize: 26,
    fontFamily: Fonts.Regular,
  },
  borderBottomPrimary: {
    height: 5,
    width:SCREEN_WIDTH *0.12,
    backgroundColor: primaryGreen,
    borderRadius: 50,
    marginTop: 5,
  },
  borderBottomLight: {
    height: 5,
    width:SCREEN_WIDTH *0.12,
    backgroundColor: primaryGreenLight,
    borderRadius: 50,
    marginTop: 5,
  },
});

export default Loader;
