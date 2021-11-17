import React from "react";
import { View, Text } from 'react-native'

const withAuth = props => WrappedComponent => {
  class withAuth extends React.Component {
    constructor (props) {
      super(props)
    }
    
    render() {
      return (
        <View {...props} > <Text>Test</Text> </View>
      );
    }
  }

  return withAuth;
};

export default withAuth;