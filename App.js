/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import Router from './src/Router';
import { CommonStyles } from '@common';
import Category, { client } from './src/screen/Category';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" style={CommonStyles.backgroundPrimary} />
        <Provider store={store}>
          <Router />
        </Provider>
    </>
  );
};

export default App;
