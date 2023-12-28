import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {theme, wh, ww} from '../../helpers';
import {Icon} from 'react-native-elements';
import MapScreen from '../../pages/MapScreen';
import DonateScreen from '../../pages/DonateScreen';
import OpportunutiesScreen from '../../pages/OpportunutiesScreen';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const screens = [
    {name: 'Map', component: MapScreen, tabName: 'Harita'},
    {name: 'Donate', component: DonateScreen, tabName: 'Bağış Yap'},
    {
      name: 'Opportunuties',
      component: OpportunutiesScreen,
      tabName: 'Fırsatlar',
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon = (
            <Icon type="feather" name="map" size={ww(0.05)} color={color} />
          );

          console.log(route.name);

          if (route.name === 'Bağış Yap') {
            icon = (
              <Icon
                type="font-awesome-5"
                name="donate"
                size={ww(0.05)}
                color={color}
              />
            );
          } else if (route.name === 'Fırsatlar') {
            icon = (
              <Icon type="octicon" name="stack" size={ww(0.05)} color={color} />
            );
          }
          return (
            <View
              style={{
                gap: ww(0.01),
                backgroundColor: theme.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {icon}
              <Text
                style={{
                  fontSize: ww(0.03),
                  flex: 1,
                  width: '100%',
                  fontFamily: theme.semiBold,
                  color: focused ? theme.secondary : '#666',
                }}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarActiveTintColor: theme.dark,
        tabBarInactiveTintColor: theme.dark50,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: wh(0.1),
          padding: wh(0.01),
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderColor: theme.grey,
        },
      })}>
      {screens.map(screen => (
        <Tab.Screen
          options={{headerShown: false}}
          key={screen.name}
          name={screen.tabName}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({});
