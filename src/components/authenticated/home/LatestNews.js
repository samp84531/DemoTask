import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Fonts from '../../../configs/fonts'
import Heading from '../../registeration/Heading'
import {grayColor} from '../configs/colors';
const LatestNews = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Heading primary='latest'/>
        <Text style={styles.headingLastUpdated}>last updated 30mins ago</Text>
      </View>
      <TouchableOpacity onPress={onPress}
         style={styles.dataItem}>
        <View style={styles.imageContainer}>
          <Image style={styles.thumbImage} resizeMode='contain' source={require('../../../assets/images/dummy-wwe-image.png')} />
        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.contentTitle} numberOfLines={2}>Rey Mysterio Details The “Peak Moment” Of His WWE Career</Text>
          <View style={styles.dateSource}>
            <Text style={styles.normalText}>12th January 2021</Text>
            <View style={{flexDirection: 'row',marginTop:2}}>
            <Text style={styles.normalText}> via </Text>
              <Text style={{ textDecorationStyle: 'dashed', textDecorationColor: grayColor, textDecorationLine: 'underline'}}>Digital Spy</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 25
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headingMain: {

  },
  headingLastUpdated: {
    marginTop: 20,
    fontStyle: "italic",
    opacity: 0.5
  },
  imageContainer: {
    marginRight: 10
  },
  contentContainer: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height:100
  },
  contentTitle: {
    fontSize: 20,
    fontFamily:Fonts.Regular,
    fontWeight: '900',
    // flex: 0.80,
    width:'90%',
    flexWrap: 'wrap'
  },
  thumbImage: {
    height: 140,
    width: 150,
    borderRadius: 8
  },
  dataItem: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 160,
    marginTop: 20,
    flexDirection: 'row',
    padding: 20
  },
  dateSource: {
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  normalText:{
    fontSize:12,
    fontWeight:'400',
    fontFamily:Fonts.Regular,
  }
})

export default LatestNews