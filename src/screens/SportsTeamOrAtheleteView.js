import React, { useState, useEffect } from 'react'
import { SafeAreaView, KeyboardAvoidingView } from 'react-native'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import SelectSportsContainer from '../components/registeration/SelectSportsContainer'
import Heading from '../components/registeration/Heading'
import AutocompleteMultiSelect from '../components/common/AutocompleteMultiSelect'
import { loadSelectedTeams, loadSelectedSports } from '../redux/actions/RegisterAction'
import ArrowButton from '../components/common/ArrowButton'
const SportsTeamOrAtheleteView = ({ callLogin,navigation }) => {
  const dispatch = useDispatch()
  const { selectedSports, selectedTeams } = useSelector(state => state.register)
  const [progressedSport, setProgressedSport] = useState({}) 
  const [refresh, setRefresh] = useState(false)
  const [teamSelectionStatus, setTeamSelectionStatus] = useState(false)
  const [isResizeContainerImage, setIsResizeContainerImage] = useState(false)
  const [showLogin, setShowLoginScreen] = useState(false)
  const fetchAndSetSport = () => {
    for (let i = 0; i < selectedSports.length; i++) {
      if (!selectedSports[i].processItem) {
        setProgressedSport(selectedSports[i])
        break;
      }
    }
  }

  const setSelectedTeams = (teams) => {
    let resultingTeams = _.unionBy(teams, selectedTeams, "id");
    dispatch(loadSelectedTeams(resultingTeams))
  }

  const processNextSport = () => {
    let exisistingSelectedSports = selectedSports;
    let selectedIndex = exisistingSelectedSports.findIndex((item) => item.id == progressedSport.id)
    exisistingSelectedSports[selectedIndex].processItem = true;
    dispatch(loadSelectedSports(exisistingSelectedSports))
    let checkProgress = exisistingSelectedSports.filter((item) => item.processItem == true);
    if (checkProgress.length == selectedSports.length) {
      navigation.navigate('AboutYou')
    } else {
      fetchAndSetSport()
    }
  }

  useEffect(() => {
    fetchAndSetSport()
  },[refresh])



  if (!showLogin && !teamSelectionStatus && progressedSport && progressedSport.id) {
    return (
      <KeyboardAvoidingView
      keyboardShouldPersistTaps="handled"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}} >
      <SelectSportsContainer callLogin={()=>navigation.navigate('LoginView')} resizeContainerImage={isResizeContainerImage}>
        <SafeAreaView style={{backgroundColor:'white',flex:1}}>
          <Heading primary={progressedSport.name} secondary='who do you follow in' />
          <AutocompleteMultiSelect resizeContainerImage={setIsResizeContainerImage} progressingSport={progressedSport} setSelectedItemsToSport={setSelectedTeams}/>
          {selectedTeams && selectedTeams.length > 0 ? (
            <ArrowButton text='next' onPress={() => processNextSport()} style={{zIndex: -1}}/>
          ):null}
       </SafeAreaView>
      </SelectSportsContainer>
      </KeyboardAvoidingView>
    )  
  }
  return null
}
export default SportsTeamOrAtheleteView