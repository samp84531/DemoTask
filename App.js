/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './src/redux/store';
import IndexView from './src/screens/IndexView'

export const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Provider store={store}>
      <IndexView />
    </Provider>
  );
};

export default App;
