import React from 'react'
import { View, Linking, ScrollView } from 'react-native'
import LatestNews from '../components/authenticated/home/LatestNews'
import YourTeams from '../components/authenticated/home/YourTeams'
import YourAthletes from '../components/authenticated/home/YourAthletes'
import Tab from './HomeView'

const HomeStack = ({navigation}) => {
  return (
    <View>
      <Tab focus={'home'}/>
      <ScrollView vertical={true}>
        <LatestNews  
          onPress={()=>{
            Linking.openURL('https://www.wrestlinginc.com/news/2021/10/rey-mysterio-details-the-peak-moment-of-his-wwe-career/')
          }} 
          />
        <YourTeams navigation={navigation} />
        <YourAthletes navigation={navigation} />
      </ScrollView>
    </View>
  )
}
export default HomeStack