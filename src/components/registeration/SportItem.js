import React from 'react'
import { View } from 'react-native'
import ModedText from '../typography/ModedText'
import Paralellogram from '../common/Parallelogram'


const SportItem = ({ item, status }) => {
  if (item && item.name) {
    return (
      <Paralellogram  value={item.name} status={status ? 'selected' : null}/>
    )
  }
  return null
}

export default SportItem