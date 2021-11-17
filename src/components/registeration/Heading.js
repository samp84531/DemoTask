import React from 'react'
import { View, StyleSheet } from 'react-native'
import ModedText from '../typography/ModedText'
import Fonts from '../../configs/fonts'
import { primaryGreen } from '../../configs/colors'


const Heading = ({ primary, secondary}) => {
  return (
    <View style={styles.container}>
      <ModedText style={styles.secondary}>{secondary}</ModedText>
      <ModedText style={styles.primary}>{primary}</ModedText>
      <View style={styles.borderBottomPrimary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 20
  },
  secondary: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: Fonts.Light
  },
  primary: {
    fontSize: 26,
    fontFamily: Fonts.Regular
  },
  borderBottomPrimary: {
    height: 5,
    width: 49,
    backgroundColor: primaryGreen,
    borderRadius: 50,
    marginTop: 5
  }
})

export default Heading