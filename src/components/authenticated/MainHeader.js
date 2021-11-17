import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

const MainHeader = ({type,title,channelImg,rightPress}) => {

  return  (
    <View style={[styles.container,{paddingHorizontal:type?10:25}]}>
      {/* manage header name  */}
      <HeaderLeft title={title} type={type}channelImg={channelImg}/>
      {/* manage image  */}
      <HeaderRight onPress={rightPress} image={type ? require('../../assets/images/searchIcon.png') : require('../../assets/images/bell-icon.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 20,
    paddingHorizontal: 25
  }
})

export default MainHeader