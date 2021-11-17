import React, { useEffect, useState, useReducer } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Platform,
  SafeAreaView
} from 'react-native';
import MainHeader from '../components/authenticated/MainHeader';
import Searchbar from '../components/authenticated/Searchbar';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Message from './../components/authenticated/message/message';
import { chatReducer } from '../redux/reducers/Chat';
import { primaryGreen, primaryLightBlue } from '../configs/colors';
import SendBird from 'sendbird';
import { APPLICATION_ID, TOKEN } from '../configs/serverApis';
const appId = APPLICATION_ID;
const sendbird = new SendBird({ appId: appId });
const ChatView = ({ navigation, route }) => {
  const { currentUser, channel } = route.params;
  const [query, setQuery] = useState(null);
  const [channelImg, setChannelImg] = useState(null)
  const [showSearch, setShowSearch] = useState(false)

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  
  const [state, dispatch] = useReducer(chatReducer, {
    sendbird,
    channel,
    messages:[],
    messageMap: {},
    loading: false,
    input: '',
    empty: '',
    error: '',
  });
  useEffect(() => {
    // chat listener create
    sendbird.addConnectionHandler('chat', connectionHandler);
    sendbird.addChannelHandler('chat', channelHandler);
    sendbird.addConnectionHandler('chat', connectionHandler);
    if (!sendbird.currentUser) {
      sendbird.connect(currentUser.userId, (_, err) => {
        if (!err) {
          refresh();
        } else {
          dispatch({
            type: 'error',
            payload: {
              error: 'Connection failed. Please check the network status.'
            }
          });
        }
      });
    } else {
      refresh();
    }
    return () => {
      sendbird.removeConnectionHandler('chat');
      sendbird.removeChannelHandler('chat');
    };
  }, []);

  useEffect(() => {
    // chat list query
    if (query) next();
  }, [query]);
  const connectionHandler = new sendbird.ConnectionHandler();
  connectionHandler.onReconnectStarted = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connecting..',
      },
    });
  };
  connectionHandler.onReconnectSucceeded = () => {
    dispatch({
      type: 'error',
      payload: {
        error: '',
      },
    });
    refresh();
  };
  connectionHandler.onReconnectFailed = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connection failed. Please check the network status.',
      },
    });
  };
  const channelHandler = new sendbird.ChannelHandler();
  // channelHandler new message fetch
  channelHandler.onMessageReceived = (targetChannel, message) => {
    if (targetChannel.url === channel.url) {
      dispatch({ type: 'receive-message', payload: { message } });
    }
  };
  channelHandler.onMessageUpdated = (targetChannel, message) => {
    if (targetChannel.url === channel.url) {
      dispatch({ type: 'update-message', payload: { message } });
    }
  };


  const refresh = () => {
    console.log('currentUser', channel);
    setChannelImg(channel.coverUrl)
    channel.markAsRead();
    setQuery(channel.createPreviousMessageListQuery());
    console.log('refresh');
  };

  // fetch  message 
  const next = () => {
    console.log('query.hasMore',query.hasMore);
    if (query.hasMore) {
      query.limit = 50;
      query.reverse = true;
      query.load((fetchedMessages, err) => {
        console.log('etchedMessages,err', fetchedMessages, err);
        if (!err) {
          dispatch({
            type: 'fetch-messages',
            payload: { messages: fetchedMessages },
          });
          setFilteredDataSource(fetchedMessages)
          setMasterDataSource(fetchedMessages)
        } else {
          dispatch({
            type: 'error',
            payload: { error: 'Failed to get the messages.' },
          });
        }
      });
    }
  };

  const sendUserMessage = () => {
    if (state.input.length > 0) {
      const params = new sendbird.UserMessageParams();
      params.message = state.input;

      const pendingMessage = channel.sendUserMessage(params, (message, err) => {
        if (!err) {
          dispatch({ type: 'send-message', payload: { message } });
        } else {
          setTimeout(() => {
            dispatch({
              type: 'error',
              payload: { error: 'Failed to send a message.' },
            });
            dispatch({
              type: 'delete-message',
              payload: { reqId: pendingMessage.reqId },
            });
          }, 500);
        }
      });
      dispatch({
        type: 'send-message',
        payload: { message: pendingMessage, clearInput: true },
      });
    }
  };
  const selectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.video,
          DocumentPicker.types.audio,
          DocumentPicker.types.plainText,
          DocumentPicker.types.zip,
        ],
      });
      console.log('result', result);
      const copyPath = `${RNFS.TemporaryDirectoryPath}/${result[0].name}`;
      console.log('copyPath', copyPath);
      await RNFS.copyFile(result[0].uri, copyPath);
      const fileStat = await RNFS.stat(copyPath);
      const params = new sendbird.FileMessageParams();
      params.file = {
        ...result[0],
        uri: `file://${fileStat.path}`,
      };
      dispatch({ type: 'start-loading' });
      channel.sendFileMessage(params, (message, err) => {
        dispatch({ type: 'end-loading' });
        if (!err) {
          dispatch({ type: 'send-message', payload: { message } });
        } else {
          setTimeout(() => {
            dispatch({
              type: 'error',
              payload: { error: 'Failed to send a message.' },
            });
          }, 500);
        }
      });
    } catch (err) {
      console.log(err);
      if (!DocumentPicker.isCancel(err)) {
        dispatch({ type: 'error', payload: { error: err.message } });
      }
    }
  };
  const viewDetail = message => {
    if (message.isFileMessage()) {
    }
  };
  const showContextMenu = message => {
    if (message.sender && message.sender.userId === currentUser.userId) {
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.message
          ? item.message.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      {showSearch ?
        <Searchbar onClear={() => search ? setSearch('') : setShowSearch(false)}   onChangeText={(text) => searchFilterFunction(text)} value={search} />
        :
        <MainHeader rightPress={() => setShowSearch(true)} title={`#${channel.name}`}
      
        type={true} channelImg={channelImg} />
      }
      <FlatList
        data={showSearch ?filteredDataSource :state.messages}
        inverted={true}
        renderItem={({ item }) => (
          <Message
            key={item.reqId}
            channel={channel}
            message={item}
            sendbird={sendbird}
            onPress={message => viewDetail(message)}
            onLongPress={message => showContextMenu(message)}
          />
        )}
        keyExtractor={item => `${item.messageId}` || item.reqId}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
        ListHeaderComponent={
          state.error && (
            <View style={style.errorContainer}>
              <Text style={style.error}>{state.error}</Text>
            </View>
          )
        }
        ListEmptyComponent={
          <View style={style.emptyContainer}>
            <Text style={style.empty}>{state.empty}</Text>
          </View>
        }
        onEndReached={() => next()}
        onEndReachedThreshold={0.5}
      />
      <View style={style.inputContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={style.uploadButton}
          onPress={selectFile}>
          <Icon name="insert-photo" color={primaryGreen} size={28} />
        </TouchableOpacity>
        <TextInput
          value={state.input}
          style={style.input}
          multiline={true}
          numberOfLines={2}
          onChangeText={content => {
            if (content.length > 0) {
              channel.startTyping();
            } else {
              channel.endTyping();
            }
            dispatch({ type: 'typing', payload: { input: content } });
          }}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={style.sendButton}
          onPress={sendUserMessage}>
          <Icon
            name="send"
            color={state.input.length > 0 ? primaryGreen : '#ddd'}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = {
  container: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? 16 : 0
  },
  errorContainer: {
    backgroundColor: '#333',
    opacity: 0.8,
    padding: 10,
  },
  error: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 24,
    color: '#999',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#555',
  },
  uploadButton: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
};

export default ChatView;
