import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import SingleAthleteContainer from '../athlete/SingleAthleteContainer';
import SingleTeamContainer from './SingleTeamContainer';
import {
  primaryBlack,
  primaryBorderColor,
  primaryGreen,
  primaryWhite,
} from '../../../configs/colors';
import {teamAthleteList} from '../../../utils/apiService';
import {BACKEND_BASE_URL} from '../../../configs/serverApis';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Heading from '../../registeration/Heading';
import axios from 'axios';
import {fetchLoginData} from '../../../utils/asyncStore';
import {SERVICE_URL} from '../../../configs/serverApis';
var loadData = [];
const Item = ({
  item,
  onPress,
  borderBottomWidth,
  borderColor,
  fontWeight,
  borderRadius,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.headerSlider]}>
    <Image
      style={{width: 30, height: 30, marginRight: 10, borderRadius}}
      source={{uri: `${BACKEND_BASE_URL + item.logo}`}}
      resizeMode="contain"
    />
    <Text
      style={[
        styles.headerSliderTitle,
        borderBottomWidth,
        borderColor,
        fontWeight,
      ]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const TopSlider = props => {
  const {type, onPress, channelImage} = props;
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [lazy, setLazy] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      pullDown();
    });
    return () => unsubscribe;
  }, []);

  const pullDown = useCallback(() => {
    loadData = [];
    setPageNo(1);
    setTeamData([]);
    setLazy(false);
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const fetchData = async () => {
    // Self invoked function with async
    console.log('pullDown', loadData, pageNo);
    try {
      if (loadData.includes(pageNo)) {
      } else {
        if (loadData.length < 1) {
          setLoading(true);
        } else {
          setLazy(teamData.length >= pageSize ? true : false);
        }
        loadData.push(pageNo);
        const data = {type: type, length: pageSize, page: pageNo}; //api parameter
        // const res = await teamAthleteList(data)
        const authData = await fetchLoginData();
        const headers = {
          Authorization: authData.token,
        };
        console.log(
          `${SERVICE_URL}/teams?type=${type}&length=${pageSize}&page=${pageNo}&followed_id=${
            props.id ? props.id : 0
          }`,
        );
        axios
          .get(
            `${SERVICE_URL}/teams?type=${type}&length=${pageSize}&page=${pageNo}&followed_id=${
              props.id ? props.id : 0
            }`,
            {headers: headers},
          )
          .then(function (res) {
            if (res && res.status === 200 && res.data && res.data.data) {
              console.log(`${SERVICE_URL}/teams?type=${type}&length=${pageSize}&page=${pageNo}&followed_id=${
                props.id ? props.id : 0
              }`);
              console.log('ressssss',res);
              if(props.id && pageNo == 1){                
                setTeamData([res.data.selected_followed_id,...res.data.data])
              }else{
                setTeamData(teamData.concat(res.data.data));
              }

              if (pageNo == 1) {
                setSelectedId(props.id ? props.id : res.data.data[0].id);
                setSelectedName(
                  props.name ? props.name : res.data.data[0].name,
                );
              }
              setPageNo(pageNo + 1);
              // channelImage(props.id ? props.id : res.data.data[0].logo);
              setLoading(false);
              setLazy(false);
            }
          })
          .catch(function (error) {});
      }
      return true;
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      setLazy(false);
      return false;
    }
  };

  useEffect(() => {
    console.log('pageNo', pageNo);
  }, [pageNo]);

  const renderItem = ({item}) => {
    const borderBottomWidth = item.id === selectedId ? 3 : 0;
    const borderColor = item.id === selectedId ? primaryGreen : 'transparent';
    const fontWeight = item.id === selectedId ? 'bold' : '500';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id), setSelectedName(item.name);
        }}
        // onPress={() => {
        //   // setSelectedId(item.id)
        //   channelImage(item.logo);
        // }}
        borderBottomWidth={{borderBottomWidth}}
        borderColor={{borderColor}}
        fontWeight={{fontWeight}}
        borderRadius={props.borderRadius ? 50 : 0}
      />
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.headerSlider}>
        {lazy ? (
          <View style={styles.lazyRoot}>
            {lazy ? (
              <View style={styles.lazyView}>
                <ActivityIndicator size={25} color={primaryBlack} />
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <>
      <View style={styles.topHorizontalListContainer}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 15,
                paddingVertical: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                <View style={{width: 30, height: 30, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                <View style={{width: 30, height: 30, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                <View style={{width: 30, height: 30, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 120, height: 20, borderRadius: 4}} />
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
        ) : (
          <FlatList
            horizontal={true}
            data={teamData}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            extraData={selectedId}
            initialNumToRender={10}
            onEndReachedThreshold={0.01}
            onEndReached={() => teamData.length >= pageSize && fetchData()}
            ListFooterComponent={renderFooter()}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      {type === 'team' ? (
        <SingleTeamContainer
          onPress={p => onPress(p)}
          selectedId={selectedId}
          navigation={props.navigation}
        />
      ) : null}
      {type === 'athlete' ? (
        <>
          <SingleAthleteContainer
            onPress={p => onPress(p)}
            selectedId={selectedId}
            navigation={props.navigation}
            name={selectedName}
          />
          <View style={styles.headingRow}>
            <Heading primary={'News ' + selectedName} />
          </View>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  contentRegion: {
    marginTop: 40,
  },
  topHorizontalListContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: primaryBorderColor,
    backgroundColor: primaryWhite,
    marginTop: 20,
  },
  headerSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 20,
  },
  headerSliderTitle: {
    fontSize: 14,
    paddingBottom: 5,
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
  lazyView: {
    height: 30,
    width: 30,
    borderRadius: 15,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 4,
    backgroundColor: 'white',
  },
  lazyRoot: {
    marginHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});
export default TopSlider;
