import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Fonts from '../../../configs/fonts'

const LatestNews = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.dataItem}>
            <Text style={styles.contentTitle}>Rey Mysterio Details The “Peak Moment” Of His WWE Career</Text>
          <Image style={styles.thumbImage} resizeMode='contain' source={require('../../../assets/images/dummy-wwe-image.png')} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 25,
    marginBottom:20
  },
  contentTitle: {
    fontSize: 16,
    fontFamily:Fonts.Regular,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap'
  },
  thumbImage: {
    height: 130,
    width: 180
  },
  dataItem: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 150,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 10,

  }
})

export default LatestNews