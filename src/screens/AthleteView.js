import React from 'react';
import {Linking, ScrollView} from 'react-native';
import TopSlider from '../components/authenticated/team/HorizontalTopSlider';
import BackgroundImageStack from '../components/authenticated/BackgroundImageStack';
import MainHeader from '../components/authenticated/MainHeader';
import Tab from '../navigation/Tab';
import News from '../components/authenticated/athlete/NewsContainer';
const AthleteView = ({navigation, route}) => {
  return (
    <BackgroundImageStack>
      <MainHeader />
      <Tab focus={'athletes'} onPress={e => navigation.navigate(e)} />
      <ScrollView nestedScrollEnabled={true}>
        <TopSlider
          borderRadius={true}
          type="athlete"
          id={route.params && route.params.id}
          navigation={navigation}
          name={route.params && route.params.name}
        />
        <News
          onPress={() => {
            navigation.navigate('WebView', {
              url: 'https://www.wrestlinginc.com/news/2021/10/rey-mysterio-details-the-peak-moment-of-his-wwe-career/',
            });
          }}
        />
      </ScrollView>
    </BackgroundImageStack>
  );
};

export default AthleteView;
