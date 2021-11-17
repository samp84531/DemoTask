import React from 'react'
import { useSelector } from 'react-redux' 
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import { BACKEND_BASE_URL } from '../../configs/serverApis'
import Fonts from '../../configs/fonts'


const HeaderLeft = ({title,channelImg}) => {
  const { loggedInUser } = useSelector(state => state.login)
  return (
    <View style={styles.container}>
      <View style={styles.propicContainer}>
        <Image source={title ? {uri:channelImg} : {uri: BACKEND_BASE_URL + loggedInUser.profile_pic}} style={styles.propic} />
      </View>
      <Text  numberOfLines={1} style={styles.username}>{title ? title : loggedInUser.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: 'center'
  },
  propic: {
    width: 60,
    height: 60,
  },
  propicContainer: {
    width: 60,
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 30,
  },
  username: {
    marginLeft: 10,
    fontFamily:Fonts.Regular,
    fontWeight:'500',
    fontSize:20,
    width:'70%'
  }
})

export default HeaderLeft