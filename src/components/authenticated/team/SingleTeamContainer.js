import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {
  primaryGreen,
  primaryLightBlue,
  primaryBorderColor,
} from '../../../configs/colors';
import {singleTeamAthleteDetails} from '../../../utils/apiService';
import moment from 'moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Fonts from '../../../configs/fonts';
import {fetchLoginData} from '../../../utils/asyncStore';
import axios from 'axios';
import {
  APPLICATION_ID,
  TOKEN,
  BACKEND_BASE_URL,
} from '../../../configs/serverApis';

const singleTeamContainer = props => {
  const {selectedId, onPress, navigation} = props;
  const [selectedTeamInfo, setSelectedTeamInfo] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [lastMsg, setLastmsg] = useState([]);
  /**
   * function to run on change of team selection from the slider
   */

  // useEffect(() => {  
  //   console.log('call1l',selectedId); 
  //   navigation.addListener('focus', async () => {
  //     console.log('calll2');
  //     if (selectedId) {
  //     try {
  //       const res = await singleTeamAthleteDetails(selectedId);
  //       console.log('resresres',res);
  //       if (res && res.status === 200 && res.data) {
  //         setSelectedTeamInfo(res.data);
  //         fetchAllChannel(res.data);
  //         setLoading(false);
  //       }
  //       return true;
  //     } catch (error) {
  //       console.log('error es', error.response);
  //       setLoading(false);
  //       return false;
  //     }
  //   }
  //   });
    
  // }, []);

  useEffect(() => {
    if (selectedId) {
      (async () => {
        try {
          const res = await singleTeamAthleteDetails(selectedId);
          if (res && res.status === 200 && res.data) {
            setSelectedTeamInfo(res.data);
            fetchAllChannel(res.data);
            setLoading(false);
          }
          return true;
        } catch (error) {
          console.log('error es', error.response);
          setLoading(false);
          return false;
        }
      })();
    }
  }, [selectedId]);

  /**
   * function to convert date into year only
   * @param {*} date
   * @returns
   */
  function covertDateToYearView(date) {
    if (date) {
      return moment(date).format('YYYY');
    }
  }

  const fetchAllChannel = async name => {
    let userId = await fetchLoginData();
    const headers = {
      'Content-Type': 'application/json',
      'Api-Token': TOKEN,
    };
    axios
      .get(`https://api-${APPLICATION_ID}.sendbird.com/v3/group_channels`, {
        headers,
      })
      .then(response => {
        console.log('response', response,name);
        if (response.status == 200) {
          if (response.data.channels.length > 0) {
            var result = response.data.channels.filter(function (e) {
              console.log('name.shortname',e.name , name);
              return e.name === name.shortname;
            });
            if (result.length > 0) {
              console.log('result[0]1', result[0],result[0].last_message.created_at);
              if (result[0].last_message) {
                setLastmsg(result);
//                 var s =moment(result[0].last_message.created_at).format('hh:mm a')
//                 var e = moment(new Date()).format('hh:mm a')
//                 var startTime = moment(s, "HH:mm:ss a");
//                 var endTime = moment(e, "HH:mm:ss a");
//                 var duration = moment.duration(endTime.diff(startTime));
// var hours = parseInt(duration.asHours());
// var minutes = parseInt(duration.asMinutes())%60;
// console.log (hours + ' hour and '+ minutes+' minutes.');
               
              }
            } else {
              setLastmsg([]);
            }
          }
        }
      })
      .catch(err => console.log('err', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.teamInfoContainer}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <View style={{width: 100, height: 100, borderRadius: 50}} />
          </SkeletonPlaceholder>
        ) : (
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: `${
                selectedTeamInfo
                  ? BACKEND_BASE_URL + selectedTeamInfo.logo
                  : null
              }`,
            }}
            resizeMode="contain"
          />
        )}
        {isLoading ? (
          <SkeletonPlaceholder>
            <View
              style={{width: 120, height: 20, borderRadius: 4, marginTop: 20}}
            />
          </SkeletonPlaceholder>
        ) : (
          <Text style={styles.teamTitle}>
            {selectedTeamInfo ? selectedTeamInfo.name : null}
          </Text>
        )}
      </View>
      <View style={styles.teamBioContainer}>
        <View style={styles.teamInfoLeftContainer}>
          <Text style={styles.teamInfoLeft}>Founded</Text>
          <Text style={styles.teamInfoLeft}>Stadium</Text>
          <Text style={styles.teamInfoLeft}>Manager</Text>
        </View>
        <View style={styles.teamInfoRightContainer}>
          {isLoading ? (
            <SkeletonPlaceholder>
              <View style={{width: '100%', height: 20, borderRadius: 4}} />
            </SkeletonPlaceholder>
          ) : (
            <Text style={styles.teamInfoRight}>
              {selectedTeamInfo
                ? covertDateToYearView(selectedTeamInfo.age) +
                  `, ${selectedTeamInfo.city}, ${selectedTeamInfo.country}`
                : null}
            </Text>
          )}
          <Text style={styles.teamInfoRight}>Emirates Stadium</Text>
          <Text style={styles.teamInfoRight}>Mikel Arteta</Text>
        </View>
      </View>
      {lastMsg.length > 0 ? (
        <View
          style={{
            borderWidth: 1,
            borderColor:primaryLightBlue,
            padding: 10,
            borderRadius: 25,
            marginBottom: 40,
            paddingBottom: -20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              style={{
                height: 56,
                width: 56,
                top: -25,
                left: -30,

                borderRadius: 30,
              }}
              source={require('../../../assets/images/noImage.png')}></Image>
            <Image
              style={{
                height: 14,
                width: 14,
                top: -20,
                right: -20,
              }}
              resizeMode={'contain'}
              source={require('../../../assets/images/qq.png')}></Image>
          </View>

          <Text
            style={{
              textAlign: 'left',
              alignSelf: 'flex-start',
              fontFamily: Fonts.Regular,
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 18,
              top: -20,
              left:56
            }}>
            {lastMsg ? lastMsg[0].last_message.message : ''}
          </Text>

          <View style={{flexDirection: 'row', alignSelf: 'flex-end', top: -20}}>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontFamily: Fonts.Regular,
                fontSize: 12,
                right: -20,
              }}>

              {
               
moment(lastMsg[0].last_message.created_at).fromNow()

// moment.duration(endTime.diff(startTime))
              }
            </Text>

            <Image
             resizeMode={'contain'}
              style={{
                height: 56,
                width: 56,
                bottom: -28,
                right: -22,
                borderRadius: 30,
              }}
              source={require('../../../assets/images/chat.png')}></Image>
          </View>
          
        </View>
      ) : null}
      {selectedTeamInfo && (
        <View style={styles.teamButtonContainer}>
          <View>
            <TouchableOpacity
              style={styles.joinTeamButton}
              onPress={() =>
                onPress(selectedTeamInfo ? selectedTeamInfo.shortname : null)
              }>
              <Text>
                join the{' '}
                <Text style={{fontWeight: 'bold'}}>
                  #{selectedTeamInfo ? selectedTeamInfo.shortname : null}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.joinCategoryButton}
              onPress={() =>
                onPress(
                  selectedTeamInfo ? selectedTeamInfo.category.shortname : null,
                )
              }>
              <Text>
                join the{' '}
                <Text style={{fontWeight: 'bold'}}>
                  #
                  {selectedTeamInfo
                    ? selectedTeamInfo.category.shortname
                    : null}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  teamInfoContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  teamTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  teamBioContainer: {
    flexDirection: 'row',
    marginVertical: 40,
  },
  teamInfoLeftContainer: {
    borderRightWidth: 1,
    borderColor: primaryBorderColor,
    paddingRight: 25,
  },
  teamInfoRight: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: Fonts.Regular,
  },
  teamInfoLeft: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  teamInfoRightContainer: {
    paddingLeft: 25,
  },
  teamButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  joinTeamButton: {
    backgroundColor: primaryLightBlue,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinCategoryButton: {
    backgroundColor: primaryGreen,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default singleTeamContainer;
