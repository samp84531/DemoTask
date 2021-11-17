import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import ModedText from '../typography/ModedText';
import { primaryGreen,textColor } from '../../configs/colors'
import Fonts from '../../configs/fonts';
const ArrowButton = ({onPress, text, visible}) => {
  return (
    <View style={styles.buttionContainer}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={visible ? 1 : 0.6}
        onPress={visible ? null : onPress}>
        {visible ? (
          <ActivityIndicator size="large" color={primaryGreen} />
        ) : (
          <>
            <ModedText style={styles.buttonText}>{text}</ModedText>
            <Image
              style={styles.buttonImage}
              resizeMode="contain"
              source={require('../../assets/images/right-arrow.png')}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonImage: {
    width: 50,
    height: 20,
  },
  buttionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: -1
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: 140,
    height: 50,
    borderRadius: 10,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily:Fonts.Regular,
    fontWeight:'700',
    fontSize:14,
    color:textColor,
  },
});

export default ArrowButton;
