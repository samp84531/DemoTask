import React from 'react'
import { View, ImageBackground, StyleSheet, Text, SafeAreaView} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { primaryWhite } from '../../configs/colors'


const BackgroundWithoutImageStack = (props) => {
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{width: '100%'}}>
          <ScrollView>
            <View style={styles.innerScrollViewContainer}>
              {props.children}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: primaryWhite
  },
  innerScrollViewContainer:{
    
  }
})

export default BackgroundWithoutImageStack