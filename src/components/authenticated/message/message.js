import React from 'react';
import UserMessage from './userMessage';
import FileMessage from './fileMessage';
const Message = props => {
  const { message } = props;
  let component = null;
  if (message.isUserMessage()) component = <UserMessage {...props} />;
  else if (message.isFileMessage()) component = <FileMessage {...props} />;
  return component;
};
// manage message type
export default Message;
