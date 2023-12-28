import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {theme, ww} from '../helpers';
import CustomHeader from '../components/CustomHeader';
import {Image} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomHeader />
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('DetailScreen', {
            subItems: [
              {title: '5 Kişilik Büyük Sandviç Paketi', price: 45, total: 5},
              {
                title: '3 Kişilik Orta Karışık Tuzlu Pasta Paketi',
                price: 30,
                total: 6,
              },
              {
                title: '5 Kişilik Büyük Karışık Tatlı Pasta Paketi',
                price: 50,
                total: 3,
              },
            ],
            title: 'Özbay Unlu Mamülleri',
            logo: 'https://www.ozbayekmek.com/demos/ozbay-logo.png',
          })
        }>
        <Image
          source={require('../assets/map.png')}
          style={{width: ww(1), height: '95%'}}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
});
