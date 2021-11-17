import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { primaryGreen, primaryChatUserColor } from '../../../configs/colors';
const IMAGE_MAX_SIZE = 240;
const DEFAULT_IMAGE_WIDTH = 260;
const DEFAULT_IMAGE_HEIGHT = 160;
const FileMessage = props => {
  const { sendbird, channel, message, onPress = () => { }, onLongPress = () => { } } = props;
  const isMyMessage = message.sender.userId === sendbird.currentUser.userId;
  const [readReceipt, setReadReceipt] = useState(0);
 
  const isImage = () => {
    return message.type.match(/^image\/.+$/);
  };
  const isVideo = () => {
    return message.type.match(/^video\/.+$/);
  };
  const isFile = () => {
    return !isImage() && !isVideo();
  };

  useEffect(() => {
    sendbird.addChannelHandler(`message-${message.reqId}`, channelHandler);
    setReadReceipt(channel.getReadReceipt(message));

    if (isImage()) {
      Image.getSize(message.url, (measureWidth, measureHeight) => {
        const scaleWidth = IMAGE_MAX_SIZE / measureWidth;
        const scaleHeight = IMAGE_MAX_SIZE / measureHeight;
        const scale = Math.min(scaleWidth <= scaleHeight ? scaleWidth : scaleHeight, 1);
        setWidth(measureWidth * scale);
        setHeight(measureHeight * scale);
      });
    }
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
        flexDirection: isMyMessage ? 'row-reverse' : 'row'
      }}
    >
    {!message.hasSameSenderAbove &&
      <Image
        style={{ ...style.circle }}
        source={message.sender.profileUrl ?{
          uri:  message.sender.profileUrl }:require('../../../assets/images/noImage.png')
        }
      />
      }
      <View style={{ ...style.content, backgroundColor: isMyMessage ? primaryChatUserColor : '#ddd', alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
      {!message.hasSameSenderAbove && <Text style={style.nickname}>{isMyMessage ?"": message.sender.nickname}</Text>}
        {isImage() && <Image source={{ uri: message.url }} style={[style.image,{width:300, height:190 }]} />}
        {isVideo() && <Video source={{ uri: message.url }} repeat={true} muted={true} style={{ ...style.video }} />}
        {isFile() && (
          <View style={{
            ...style.messageBubble, backgroundColor: isMyMessage ? primaryGreen : '#ddd',
            paddingRight: isMyMessage ? 40 : 10,
            paddingLeft: isMyMessage ? 10 : 40,
          }}>
            <Icon name="attach-file" color={isMyMessage ? '#fff' : '#333'} size={18} />
            <Text style={{ ...style.message, color: isMyMessage ? '#fff' : '#333' }}>{message.name}</Text>
          </View>
        )}
        <Text style={{ ...style.updatedAt, alignSelf: isMyMessage ? 'flex-start' : 'flex-end' }}>{moment(message.createdAt).format('hh:mm')}</Text>
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
    alignSelf: 'flex-end',
    marginHorizontal: 4,
    paddingHorizontal: 5,
    borderRadius:5
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
  image: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginTop: 6,
    
  },
  video: {
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT,
    borderRadius: 8,
    marginTop: 6
  },
  messageBubble: {
    maxWidth: 240,
    borderRadius: 12,
    paddingVertical: 5
  },
  message: {
    fontSize: 16,
    marginTop:8
  },
  status: {
    alignSelf: 'flex-end',
    marginHorizontal: 3,
    marginBottom: 2
  },
  readReceipt: {
    fontSize: 12,
    color: '#f89'
  },
  updatedAt: {
    fontSize: 12,
    color: '#999'
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

export default FileMessage;
