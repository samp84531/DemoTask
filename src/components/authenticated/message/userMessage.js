import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import { primaryChatUserColor } from '../../../configs/colors';
import Fonts from '../../../configs/fonts';
const UserMessage = props => {
  const { sendbird, channel, message, onPress = () => { }, onLongPress = () => { } } = props;
  const isMyMessage = message.sender.userId === sendbird.currentUser.userId;
  const [readReceipt, setReadReceipt] = useState(channel.members.length - 1);

  useEffect(() => {
    sendbird.addChannelHandler(`message-${message.reqId}`, channelHandler);
    setReadReceipt(channel.getReadReceipt(message));
    return () => {
      sendbird.removeChannelHandler(`message-${message.reqId}`);
    };
  }, []);

  const channelHandler = new sendbird.ChannelHandler();
  channelHandler.onReadReceiptUpdated = targetChannel => {
    if (targetChannel.url === channel.url) {
      const newReadReceipt = channel.getReadReceipt(message);
      if (newReadReceipt !== readReceipt) {
        setReadReceipt(newReadReceipt);
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(message)}
      onLongPress={() => onLongPress(message)}
      style={{
        ...style.container,
        flexDirection: isMyMessage ? 'row-reverse' : 'row',
      }}>
        {!message.hasSameSenderAbove &&
      <Image
        style={{ ...style.circle }}
        source={message.sender.profileUrl ?{
          uri:  message.sender.profileUrl }:require('../../../assets/images/noImage.png')
        }
      />
      }
     
      <View style={{ ...style.content, alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
      {!message.hasSameSenderAbove && <Text style={style.nickname}>{isMyMessage ?"": message.sender.nickname}</Text>}
        <View style={{
          ...style.messageBubble, backgroundColor: isMyMessage ? primaryChatUserColor : undefined,
          paddingRight: isMyMessage ? 40 : 10,
          paddingLeft: isMyMessage ? 10 : 40,
        }}>
          
          <Text style={{ ...style.message, color: isMyMessage ? '#000' : '#333' }}>{message.message}</Text>
          <Text style={{ ...style.updatedAt, alignSelf: isMyMessage ? 'flex-start' : 'flex-end' }}>{moment(message.createdAt).format('hh:mm')}</Text>
        </View>
      </View>
      <View style={{ ...style.status, alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
        {message.sendingStatus === 'pending' && (
          <Progress.Circle size={10} indeterminate={true} indeterminateAnimationDuration={800} color="#999" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const style = {
  container: {
    paddingHorizontal: 4,
    marginVertical: 2,
    marginTop: 40,
    marginLeft: 40
  },
  content: {
    alignSelf: 'center',
    // right: 8
  },
  nickname: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 8,
    position: 'absolute',
    top: -12,
    left: 30,
    zIndex: 2
   
  },
  messageBubble: {
    maxWidth: 280,
    borderRadius: 12,
    paddingVertical: 5
  },
  message: {
    fontSize: 16,
    marginTop:8,
    fontFamily:Fonts.Regular
  },
  status: {
    alignSelf: 'flex-end',
    marginHorizontal: 3,
    marginBottom: 3
  },
  readReceipt: {
    fontSize: 12,
    color: '#f89'
  },
  updatedAt: {
    fontSize: 12,
    fontFamily:Fonts.Regular,
    color: '#999',
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    top: -30,
    left: -30,
    zIndex: 2
  }
};

export default UserMessage;
