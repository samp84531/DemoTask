import React from 'react';
import {View,StatusBar,SafeAreaView} from 'react-native';
import WebView from "react-native-webview";
const Webview = ({route}) => {
    return (
      <SafeAreaView style={[styles.container,{paddingTop:Platform.OS == 'android' && 40}]}>
      <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={styles.container}>
        <WebView source={{uri:route.params.url}} />
      </View>
      </SafeAreaView>  
    );
}
export default Webview;
const styles = {
  container: {
    flex: 1,
  }
}