import React from 'react';
import {View, StyleSheet, Text } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fonts from '../configs/fonts';
import {textColor,primaryBlack} from '../configs/colors';
const Tab = ({onPress, focus}) => {
  return (

      <View style={styles.contentRegion} key={new Date()}>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={focus != 'home'?0.6:1}
          onPress={focus != 'home'?()=>onPress('Home'):null}
          style={styles.btnStyle}>
          <Text style={[styles.textStyle, focus == 'home' &&{color:textColor,fontFamily: Fonts.Regular,fontWeight:'bold',color:primaryBlack}]}>
            home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={focus != 'teams'?0.6:1}
          onPress={focus != 'teams'?()=>onPress('Teams'):null}
          style={styles.btnStyle}>
          <Text style={[styles.textStyle, focus == 'teams' &&{color:textColor,fontFamily: Fonts.Regular,fontWeight:'bold',color:primaryBlack}]}>
            teams
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={focus != 'athletes'?0.6:1}
          onPress={focus != 'athletes'?()=>onPress('Athletes'):null}
          style={styles.btnStyle}>
         <Text style={[styles.textStyle, focus == 'athletes' &&{color:textColor,fontFamily: Fonts.Regular,fontWeight:'bold',color:primaryBlack}]}>
            athletes
          </Text>
        </TouchableOpacity>
      </View>

  );
};

const styles = StyleSheet.create({
  contentRegion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    paddingHorizontal: 20
  },
  btnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,    
  },
});
export default Tab;