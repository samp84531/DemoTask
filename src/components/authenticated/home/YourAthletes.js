import React, {useEffect, useState} from 'react';
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
const YourAthlets = ({navigation}) => {
  const [athletes, setAthletes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      // Self invoked function with async
      try {
        const data = {type: 'athlete', length: 10}; //api parameter
        const res = await teamAthleteFollowedByUser(data);
        if (res && res.status === 200 && res.data && res.data.data) {
          console.log('setAthletes', res.data.data);
          setAthletes(res.data.data);
          setLoading(false);
        }
        return true;
      } catch (error) {
        console.log('error', error.response);
        setLoading(false);
        return false;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginLeft: 25}}>
        <Heading primary="your athletes" />
      </View>
      <View style={styles.imagesColl}>
        <ScrollView
          style={styles.athletslist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {isLoading ? (
            <SkeletonPlaceholder>
              <View style={{width: 100, height: 100, borderRadius: 50}} />
            </SkeletonPlaceholder>
          ) : athletes && athletes.length > 0 ? (
            athletes.map((athlete, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Athletes',{id:athlete.id,name:athlete.name});
                  }}
                  style={[
                    styles.imageContainer,
                    {marginLeft: index == 0 ? 25 : 0},
                  ]}>
                  <Image
                    style={styles.image}
                    source={{uri: `${BACKEND_BASE_URL + athlete.logo}`}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </React.Fragment>
            ))
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    // flex: 1,
    width: 120,
    height: 120,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginRight: 20,
  },
  imagesColl: {
    marginTop: 30,
  },
});

export default YourAthlets;
