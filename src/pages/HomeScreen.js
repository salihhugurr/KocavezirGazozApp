import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {formatDate, theme, ww} from '../helpers';
import CustomHeader from '../components/CustomHeader';
import {Divider, Image, ListItem} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetAllOrders} from '../services/orders';
import {useAuth} from '../context';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState('Geçmiş Siparişler');

  useFocusEffect(
    React.useCallback(() => {
      const getCustomers = async () => {
        try {
          const res = await GetAllOrders();
          console.log(res.data);
          setOrders(res.data); // Assuming that res is an array of customers
        } catch (error) {
          console.log('Error:', error);
        }
      };
      getCustomers();

      return () => {};
    }, []),
  );

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        containerStyle={{
          backgroundColor: '#f2f2f2',
          borderRadius: 8,
        }}>
        <ListItem.Content>
          <ListItem.Title
            style={{
              fontFamily: theme.bold,
              fontSize: ww(0.04),
              color: '#708090',
            }}>
            {item.customer.name}
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontFamily: theme.bold,
              fontSize: ww(0.035),
              color: '#708090',
            }}>
            {item.given_white_soda} kasa Beyaz Soda verildi.
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontFamily: theme.bold,
              fontSize: ww(0.035),
              color: '#708090',
            }}>
            {item.given_yellow_soda} kasa Sarı Soda verildi.
          </ListItem.Title>
          <ListItem.Title
            style={{
              fontFamily: theme.bold,
              fontSize: ww(0.035),
              color: '#708090',
            }}>
            Toplam {item.gathered_white_soda + item.gathered_yellow_soda} kasa
            alındı.
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              marginTop: 2,
              fontFamily: theme.medium,
              color: theme.secondary,
            }}>
            Ürün Fiyatı: {item.price}₺
          </ListItem.Subtitle>
          <ListItem.Subtitle
            style={{
              marginTop: 2,
              fontFamily: theme.medium,
              color: theme.secondary,
            }}>
            {item.gathered_money}₺ alındı. -- {formatDate(item.order_date)}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={'Anasayfa'} />
      {user.role === 'admin' && (
        <View style={styles.tabContainer}>
          <TouchableWithoutFeedback
            onPress={() => setActive('Geçmiş Siparişler')}
            containerStyle={{
              ...styles.tabItem,
              backgroundColor:
                active === 'Geçmiş Siparişler' ? theme.main : theme.secondary,
            }}>
            <Text style={{...styles.tabText}}>Geçmiş Siparişler</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => setActive('Toplam')}
            containerStyle={{
              ...styles.tabItem,
              backgroundColor:
                active === 'Toplam' ? theme.main : theme.secondary,
            }}>
            <Text style={styles.tabText}>Toplam</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      {user.role === 'admin' && active === 'Toplam' && (
        <View style={{flex: 1, padding: 16}}>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Toplam 257 adet verildi.</ListItem.Title>
              <ListItem.Subtitle>10000₺ alındı.</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      )}
      {active === 'Geçmiş Siparişler' && (
        <FlatList
          data={orders}
          ItemSeparatorComponent={
            <Divider width={0.5} color={theme.secondary} />
          }
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  tabContainer: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabItem: {
    padding: ww(0.03),
    margin: ww(0.01),
    borderRadius: 4,
    flex: 1,
  },
  tabText: {
    textAlign: 'center',
    color: theme.white,
    fontFamily: theme.bold,
  },
});
