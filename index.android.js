/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Launch from './src/launch'
import { Navigator } from 'react-native-deprecated-custom-components';
import Store from "./src/store/store";
import { Provider } from 'react-redux';

export default class Zuimao extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigator
          initialRoute={{ component: Launch }}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.passProps} navigator={navigator} />
          }
          }
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('shopzuimao', () => Zuimao);
