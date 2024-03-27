import React, {Component} from 'react';
import Router from './src/routes/Router';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context';

export class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router />
      </AuthProvider>
    );
  }
}

export default App;
