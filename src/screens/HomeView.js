import React from 'react';
import { ScrollView} from 'react-native';
import LatestNews from '../components/authenticated/home/LatestNews';
import YourTeams from '../components/authenticated/home/YourTeams';
import YourAthletes from '../components/authenticated/home/YourAthletes';
import Tab from '../navigation/Tab';
import BackgroundImageStack from '../components/authenticated/BackgroundImageStack';
import MainHeader from '../components/authenticated/MainHeader';

const HomeStack = ({navigation}) => {
  return (
    <BackgroundImageStack>
      <MainHeader />
      <Tab focus={'home'} onPress={e => navigation.navigate(e)} />
      <ScrollView vertical={true}>
        <LatestNews onPress={()=>{
          navigation.navigate('WebView', {
            url: 'https://www.wrestlinginc.com/news/2021/10/rey-mysterio-details-the-peak-moment-of-his-wwe-career/',
          });
        }} />
        <YourTeams navigation={navigation} />
        <YourAthletes navigation={navigation} />
      </ScrollView>
    </BackgroundImageStack>
  );
};

export default HomeStack;
