import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Heading from '../../registeration/Heading';
import {teamAthleteFollowedByUser} from '../../../utils/apiService';
import {BACKEND_BASE_URL} from '../../../configs/serverApis';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const YourTeams = ({navigation}) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Self invoked function with async
      try {
        const data = {type: 'team', length: 10}; //api parameter
        const res = await teamAthleteFollowedByUser(data);
        console.log('res teams',res);
        if (res && res.status === 200 && res.data && res.data.data) {
          setTeams(res.data.data);
          setLoading(false);
        }
        return true;
      } catch (error) {
        console.log('errorT', error.response);
        setLoading(false);
        return false;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {teams && teams.length > 0 ? (
      <View style={{marginLeft: 25}}>
        <Heading primary="your teams" />
      </View>):null}
      <ScrollView style={styles.teamsList} horizontal={true} showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <View style={{width: 100, height: 100, borderRadius: 50}} />
          </SkeletonPlaceholder>
        ) : teams && teams.length > 0 ? (
        
         teams.map((team, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Teams',{id:team.id});
                  }} style={[
                    styles.imageContainer,
                    {marginLeft: index == 0 ? 25 : 0},
                  ]}>
                <Image
                  style={styles.image}
                  source={{uri: `${BACKEND_BASE_URL + team.logo}`}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </React.Fragment>
          ))
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  teamsList: {
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageItem: {
    height: 60,
  },
  imageContainer: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginRight: 20,
  },
});

export default YourTeams;
