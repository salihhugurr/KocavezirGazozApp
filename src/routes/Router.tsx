import {StyleSheet} from 'react-native';
import React from 'react';
import TabRoutes from './TabRoutes/TabRoutes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from '../pages/DetailScreen';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="App" component={TabRoutes} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
const styles = StyleSheet.create({});
