import React from 'react'
import { View, StyleSheet } from 'react-native'
import ModedText from '../typography/ModedText'
import { lightGrey, primaryGreen } from '../../configs/colors'
import Fonts from '../../configs/fonts';
const Paralellogram = ({ value, status }) => {
  if (value) {
    if (status === 'selected') {
      return (
        <View style={{...styles.bgsprite, borderColor: primaryGreen}}>
          <ModedText style={styles.innerTextSelected}>
            {value}
          </ModedText>
        </View>
      )
    } else {
      return (
        <View style={{...styles.bgsprite, borderColor: 'transparent'}}>
          <ModedText style={styles.innerText}>
            {value}
          </ModedText>
        </View>
      )
    }
  }
  return null
  
}

const styles = StyleSheet.create({
  bgsprite: {
    width: 143,
    height: 75,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 20,
    transform: [{ skewX: "-5deg" }, { skewY: "0deg" }],
    borderColor: lightGrey,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily:Fonts.Light

  },
  innerTextSelected: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily:Fonts.Regular
  },
  bgCorners: {
    height: 60
  }
})

export default Paralellogram