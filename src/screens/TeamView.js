import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchChannelAction} from '../redux/actions/FetchChannelAction';
import TopSlider from '../components/authenticated/team/HorizontalTopSlider';
import Spinner from '../components/common/Spinner';
import {fetchLoginData} from '../utils/asyncStore';
import SendBird from 'sendbird';
import axios from 'axios';
import {APPLICATION_ID, TOKEN, BACKEND_BASE_URL} from '../configs/serverApis';
import BackgroundImageStack from '../components/authenticated/BackgroundImageStack';
import MainHeader from '../components/authenticated/MainHeader';
import Tab from '../navigation/Tab';
import TeamMatchContainer from '../components/authenticated/team/TeamMatchContainer';
import StatisticsContainer from '../components/authenticated/team/StatisticsContainer';
import BettingContainer from '../components/authenticated/team/BettingContainer';
import CryptoContainer from '../components/authenticated/team/CryptoContainer';
import {cryptoList} from'../utils/apiService';
const appId = APPLICATION_ID;
const sendbird = new SendBird({appId: appId});
const TeamView = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(null);
  const [type, setType] = useState(1);
  const [crypto, setCrypto] = useState([]);
  const [isName, setName] = useState('');
  const [loading, setLoader] = useState(false);
  const [userChannel, setUserChannel] = useState(null);
  const [channelImage, setChannelImage] = useState('');
  const joinChannel = useSelector(state => state.joinChannelReducer);
  const fetchChannel = useSelector(state => state.fetchChannelReducer);

  useEffect(() => {               
    iscrypto();
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoader(true);
      let userId = await fetchLoginData();
      setQuery(sendbird.GroupChannel.createPublicGroupChannelListQuery());
      fetchAllChannel('');
      fetchLoginData()
        .then(userData => {
          sendbird.addConnectionHandler('invite', connectionHandler);
          if (!sendbird.currentUser) {
            sendbird.connect(userId.username.toString(), (_, err) => {
              if (!err) {
                refresh();
              } else {
                refresh();
                console.log(
                  'Connection failed. Please check the network status.',
                  err,
                );
                setLoader(false);
              }
            });
          } else {
            refresh();
          }
        })
        .catch(err => console.log('err', err));
    });
    return () => {
      sendbird.removeConnectionHandler('invite');
      sendbird.removeConnectionHandler('channels');
      sendbird.removeChannelHandler('channels');
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    if (query) fetchUserChannels();
  }, [query]);

  const refresh = async () => {
    setQuery(sendbird.GroupChannel.createPublicGroupChannelListQuery());
    console.log('refresh');
  };
  const connectionHandler = new sendbird.ConnectionHandler();
  connectionHandler.onReconnectStarted = () => {
    console.log('Connecting');
  };
  connectionHandler.onReconnectSucceeded = () => {
    console.log('error');
  };
  connectionHandler.onReconnectFailed = () => {
    console.log('Connection failed. Please check the network status.');
  };

  const fetchAllChannel = async name => {
    // fetchAllChannel
    const headers = {
      'Content-Type': 'application/json',
      'Api-Token': TOKEN,
    };
    axios
      .get(`https://api-${APPLICATION_ID}.sendbird.com/v3/group_channels`, {
        headers,
      })
      .then(response => {
        console.log('channels', response);
        if (response.status == 200) {
          if (name) {
            isChannel(name);
            setName(name);
          }
          dispatch(fetchChannelAction(response.data));
        }
      })
      .catch(err => setLoader(false));
  };

  const fetchUserChannels = async () => {
    let userId = await fetchLoginData();
    if (query.hasNext) {
      query.includeEmpty = true;
      query.memberStateFilter = 'joined_only';
      query.order = 'latest_last_message';
      query.limit = 15;
      query.next((fetchedChannels, err) => {
        setLoader(false);
        if (!err) {
          setUserChannel(fetchedChannels);
          if (type != 1) {
            var result = fetchedChannels.filter(function (e) {
              return e.name === isName;
            });
            if (result.length > 0) {
              if (
                result[0].members.some(
                  e => e.userId == userId.username.toString(),
                )
              ) {
                setType(1);
                setName('');
                setLoader(false);
                navigation.navigate('Chat', {
                  channel: result[0],
                  currentUser: userId,
                });
              }
            }
          }
        } else {
          console.log('Failed to get the channels.');
        }
      });
    } else {
      setLoader(false);
    }
  };

  const joinChannels = async url => {
    //e join channel api, now use static
    let userId = await fetchLoginData();
    const inputs = {user_id: userId.username.toString()};
    const headers = {
      'Content-Type': 'application/json',
      'Api-Token': TOKEN,
    };
    axios
      .put(
        `https://api-${APPLICATION_ID}.sendbird.com/v3/group_channels/${url}/join`,
        inputs,
        {headers},
      )
      .then(response => {
        setType(2);
        setQuery(sendbird.GroupChannel.createPublicGroupChannelListQuery());
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  };

  const createChannel = async name => {
    console.log('channelImage', channelImage.toString());
    let userId = await fetchLoginData();
    var params = new sendbird.GroupChannelParams();
    params.isPublic = true;
    params.isEphemeral = false;
    params.isDistinct = false;
    params.isSuper = false;
    params.addUserIds([userId.username.toString()]);
    params.name = name;
    params.channelUrl = null;
    params.coverImage = null;
    sendbird.GroupChannel.createChannel(params, (channel, err) => {
      if (channel) {
        navigation.navigate('Chat', {
          channel: channel,
          currentUser: userId,
        });
      }
    });
  };
  // create channel and join channel here
  const isChannel = async name => {
    var result = userChannel.filter(function (e) {
      return e.name === name;
    });
    var result2 = fetchChannel.data.channels.filter(function (e) {
      return e.channel.name == name;
    });
    let userId = await fetchLoginData();
    if (userChannel.length > 0) {
      if (result.length > 0) {
        if (
          result[0].members.some(e => e.userId == userId.username.toString())
        ) {
          navigation.navigate('Chat', {
            channel: result[0],
            currentUser: userId,
          });
        } else {
          joinChannels(result[0].channel_url);
        }
      } else {
        createChannel(name);
      }
    } else {
      if (fetchChannel.data.channels && fetchChannel.data.channels.length > 0) {
        fetchChannel.data.channels.some(el => {
          if (result2.length > 0) {
            joinChannels(el.channel_url);
          } else {
            createChannel(name);
          }
        });
      } else {
        createChannel(name);
      }
    }
    setLoader(false);
  };

  const iscrypto = async () => {
    const res = await cryptoList();
    if (res && res.status === 200) {
      setCrypto(res.data)
    }
  };

  return (
    <BackgroundImageStack>
      <MainHeader />
      <Tab focus={'teams'} onPress={e => navigation.navigate(e)} />
      <ScrollView>
        <Spinner loading={loading} />
        <TopSlider
          channelImage={e => {
            setChannelImage(BACKEND_BASE_URL + e);
          }}
          onPress={name => {
            setLoader(true);
            fetchAllChannel(name); //same fetch new channel
          }}
          borderRadius={false}
          type="team"
          navigation={navigation}
          id={route.params && route.params.id}
          name={route.params && route.params.name}

          
        />

        <TeamMatchContainer />

        <StatisticsContainer />

        <BettingContainer />

        <CryptoContainer data={crypto} />
      </ScrollView>
    </BackgroundImageStack>
  );
};
export default TeamView;
