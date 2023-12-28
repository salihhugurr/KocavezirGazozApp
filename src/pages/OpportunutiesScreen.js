import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme, wh, ww} from '../helpers';
import CustomHeader from '../components/CustomHeader';
import {Avatar, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const OpportunutiesScreen = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 0,
      title: 'Levent Börekçilik',
      distance: '0.3 km',
      opportunuty: 3,
      logo: 'https://pardon-app.com/wp-content/uploads/2021/10/logolar-10.png',
      subItems: [
        {title: '5 Kişilik Büyük Börek Paketi', price: 0, total: 10},
        {title: '2 Kişilik Orta Börek Paketi', price: 0, total: 4},
        {title: 'Tek Kişilik Büyük Börek Paketi', price: 0, total: 8},
      ],
    },
    {
      id: 1,
      title: 'Gaye Unlu Mamülleri',
      distance: '1.1 km',
      opportunuty: 2,
      logo: 'https://gayefirin.com/admin/images/logo/67384.jpg',
      subItems: [
        {title: '5 Kişilik Büyük Sandviç Paketi', price: 100, total: 9},
        {
          title: '3 Kişilik Orta Karışık Tuzlu Pasta Paketi',
          price: 40,
          total: 7,
        },
        {
          title: '5 Kişilik Büyük Karışık Tatlı Pasta Paketi',
          price: 60,
          total: 5,
        },
      ],
    },
    {
      id: 2,
      title: 'Özbay Unlu Mamülleri',
      distance: '1.7 km',
      opportunuty: 1,
      logo: 'https://www.ozbayekmek.com/demos/ozbay-logo.png',
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
    },
    {
      id: 3,
      title: 'Groseri',
      distance: '2.5 km',
      opportunuty: 8,
      logo: 'https://www.lami.com.tr/uploads/groseri.jpg',
      subItems: [
        {title: 'Büyük Bakliyat Paketi', price: 100, total: 9},
        {
          title: 'Büyük Sebze Paketi',
          price: 20,
          total: 7,
        },
        {
          title: 'Büyük Gıda Paketi',
          price: 80,
          total: 5,
        },
      ],
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('DetailScreen', {
            subItems: item.subItems,
            title: item.title,
            logo: item.logo,
          })
        }>
        <View style={{flex: 1}}>
          <Avatar source={{uri: item.logo}} size={'large'} />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>
            Şu an aktif {item.opportunuty} fırsat bulunmakta
          </Text>
        </View>
        <View style={{flex: 0.6}}>
          <Text>{item.distance}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeader />
      <FlatList
        data={data}
        ItemSeparatorComponent={<Divider width={1} color={theme.secondary} />}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default OpportunutiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  item: {
    paddingHorizontal: ww(0.03),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wh(0.1),
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: theme.bold,
    fontSize: ww(0.045),
    color: theme.main,
  },
  info: {
    marginTop: 5,
    fontFamily: theme.regular,
    fontSize: ww(0.04),
    color: theme.secondary,
  },
});
