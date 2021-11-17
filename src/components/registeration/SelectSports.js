import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { alphaBlack3perct } from '../../configs/colors'
import ModedText from '../typography/ModedText'
import SelectSportsItems from './SelectSportsItems'

const SelectSports = () => {
  return (
    <View style={styles.mainWrapper}>
      <SelectSportsItems />
    </View>
  )
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: alphaBlack3perct,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    minHeight: 200
  }
})

export default SelectSports