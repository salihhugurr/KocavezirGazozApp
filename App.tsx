import React, {Component} from 'react';
import Router from './src/routes/Router';
import 'react-native-gesture-handler';

export class App extends Component {
  render() {
    return <Router />;
  }
}

export default App;
