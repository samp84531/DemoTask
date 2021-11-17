import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {primaryWhite} from '../../configs/colors';
import Fonts from '../../configs/fonts';
import ModedText from '../typography/ModedText';

const SelectSportsContainer = props => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/static-register-pattern.png')}
          style={styles.backgroundPattern}
          imageStyle={{
            ...styles.backgroundImageStyle,
            ...(props.resizeContainerImage && {
              width: '50%',
              left: '50%',
              height: 150,
            }),
          }}>
          <Image
            resizeMode={'contain'}
            style={{
              ...styles.forgroundStyle,
              ...(props.resizeContainerImage && {height: '15%'}),
            }}
            source={require('../../assets/images/static-register-foreground.png')}
          />
          <ScrollView
            //  nestedScrollEnabled={true}
            style={{flex: 1}}
            keyboardShouldPersistTaps="handled">
            {props.children}
            <View
              style={{
                justifyContent: 'flex-end',
                marginTop: 20,
                marginBottom: 20,
                alignItems: 'center',
              }}></View>
          </ScrollView>
          <View style={{height: 40}} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.callLogin()}>
            <ModedText style={styles.loginText}>
              i've already registered
            </ModedText>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // width: '100%',
    // paddingHorizontal: 25,
    backgroundColor: primaryWhite,
  },
  backgroundPattern: {
    width: '100%',
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  backgroundImageStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: 300,
    top: 0,
    left: '4%',
  },
  forgroundStyle: {
    height: '30%',
    marginTop: '20%',
    marginLeft: '45%',
    top: 25,
  },
  mainWrapper: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: primaryWhite,
    flexDirection: 'column',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    alignItems: 'center',
  },
  loginText: {
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  button: {
    bottom: 20,
    alignSelf: 'center',
  },
});

export default SelectSportsContainer;
