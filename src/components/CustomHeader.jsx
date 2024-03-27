import React from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Avatar, Header as HeaderRNE, Icon, Text} from 'react-native-elements';
import {convertToInitials, theme, wh, ww} from '../helpers';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({
  title,
  right,
  left,
  edit,
  leftNavigation,
  navigation,
  onPressRight,
  onPressProfile,
  center,
}) => {
  const nav = useNavigation();
  return (
    <>
      <HeaderRNE
        containerStyle={styles.headerContainer}
        leftContainerStyle={{width: '100%'}}
        leftComponent={
          center ? (
            <></>
          ) : left ? (
            <TouchableOpacity
              style={styles.headerLeft}
              onPress={() =>
                !leftNavigation ? navigation.goBack() : leftNavigation()
              }>
              <Icon
                name="chevron-left"
                type="feather"
                color={theme.secondary}
                size={ww(0.06)}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        rightComponent={
          right && !edit ? (
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() =>
                !leftNavigation ? navigation.goBack() : leftNavigation()
              }>
              <Icon
                name="x"
                type="feather"
                color={theme.secondary}
                size={ww(0.06)}
              />
            </TouchableOpacity>
          ) : right && edit ? (
            <TouchableOpacity onPress={onPressRight}>
              <Icon
                name="edit"
                type="feather"
                color={theme.secondary}
                style={{marginRight: ww(0.03)}}
                size={ww(0.06)}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        centerComponent={
          right && title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : !left && !center ? (
            <TouchableWithoutFeedback
              onPress={() => nav.navigate('App', {screen: 'Map'})}>
              <Image
                source={require('../assets/logo.jpeg')}
                style={{width: ww(0.15), height: ww(0.15)}}
              />
            </TouchableWithoutFeedback>
          ) : title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : (
            <></>
          )
        }
      />
      <View
        style={{
          width: '100%',
          height: 0.2,
          marginTop: 5,
          backgroundColor: theme.secondary,
          marginBottom: 2,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: theme.white,
    height: wh(0.14),
    width: '100%',
    paddingHorizontal: 15,
  },
  heading: {
    color: 'white',
    fontSize: ww(0.04),
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ww(0.04),
    flexDirection: 'row',
    marginRight: ww(0.02),
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerLeft: {
    width: '200%',
    flexDirection: 'row',
    gap: ww(0.03),
    alignItems: 'center',
  },

  titleText: {
    flex: 1,
    fontSize: ww(0.045),
    color: theme.dark,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: theme.medium,
  },
  descText: {
    fontSize: ww(0.02),
    color: theme.red,
    width: '100%',
    fontFamily: theme.medium,
  },
});

export default CustomHeader;
