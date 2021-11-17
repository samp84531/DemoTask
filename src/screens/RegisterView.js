import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import SelectSportsContainer from '../components/registeration/SelectSportsContainer'
import Heading from '../components/registeration/Heading'
import SelectSports from '../components/registeration/SelectSports'
import ArrowButton from '../components/common/ArrowButton'
const Register = ({navigation}) => {
  const { selectedSports } = useSelector(state => state.register)
  const showSportTeamsSelection = () => {
    navigation.navigate('SportsTeamOrAtheleteView')
  }
    return (
      <SelectSportsContainer callLogin={()=>navigation.navigate('LoginView')}>
        <SafeAreaView>
          <Heading primary='sports interests' secondary='tell us about your' />
          <SelectSports />
          {selectedSports && selectedSports.length > 0 ? (
            <View style={{ marginTop: 20 }}>
              <ArrowButton text='next'  onPress={() => showSportTeamsSelection()} />
            </View>
          ) : null}
        </SafeAreaView>
      </SelectSportsContainer>
    )
}

export default Register