import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {formatDate, theme, wh, ww} from '../helpers';
import CustomHeader from '../components/CustomHeader';
import {Button, Divider, Image, Input, ListItem} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {globalStyles} from '../styles';
import {GetOrdersByCustomerIdService} from '../services/orders';
import {GetCustomerById} from '../services/customer';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [customer, setCustomer] = useState([]);
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState('Müşteri Bilgisi');
  const [loading, setLoading] = useState(true);
  const nameRef = useRef();
  const customerNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const locationRef = useRef();
  const balanceRef = useRef();
  const balanceWhiteSodaRef = useRef();
  const balanceYellowSodaRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const ordersResponse = await GetOrdersByCustomerIdService(
            route.params.id,
          );
          const customerResponse = await GetCustomerById(route.params.id);

          if (ordersResponse.status && customerResponse.status) {
            setOrders(ordersResponse.data);
            setCustomer(customerResponse.data);
          } else {
            Alert.alert(
              'Siparişler veya müşteri bilgileri getirilirken bir hata oluştu',
            );
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          Alert.alert('Veriler getirilirken bir hata oluştu');
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
      };

      fetchData();

      return () => {
        // Cleanup function if needed
      };
    }, [route.params.id, navigation]), // Add any dependencies here
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title={customer.name}
        left
        navigation={navigation}
        onPressRight={() => {
          navigation.navigate('AddCustomer', {
            edit: true,
            customer: customer,
          });
        }}
        right
        edit
      />
      <View style={styles.tabContainer}>
        <TouchableWithoutFeedback
          onPress={() => setActive('Müşteri Bilgisi')}
          containerStyle={{
            ...styles.tabItem,
            backgroundColor:
              active === 'Müşteri Bilgisi' ? theme.main : theme.secondary,
          }}>
          <Text style={{...styles.tabText}}>Müşteri Bilgisi</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => setActive('Geçmiş Siparişler')}
          containerStyle={{
            ...styles.tabItem,
            backgroundColor:
              active === 'Geçmiş Siparişler' ? theme.main : theme.secondary,
          }}>
          <Text style={styles.tabText}>Geçmiş Siparişler</Text>
        </TouchableWithoutFeedback>
      </View>
      {active === 'Müşteri Bilgisi' && !loading && (
        <ScrollView style={styles.formContainer}>
          <Input
            ref={nameRef}
            onSubmitEditing={() => customerNameRef.current.focus()}
            label="Firma Adı"
            value={customer.name}
            labelStyle={globalStyles.label}
            disabled
            style={globalStyles.input}
            onChangeText={text => handleInputChange('name', text)}
          />
          <Input
            ref={customerNameRef}
            onSubmitEditing={() => phoneRef.current.focus()}
            label="Müşteri Adı Soyadı"
            labelStyle={globalStyles.label}
            disabled
            value={customer.customer_name}
            style={globalStyles.input}
            onChangeText={text => handleInputChange('customer_name', text)}
          />
          <Input
            ref={phoneRef}
            onSubmitEditing={() => emailRef.current.focus()}
            label="Telefon Numarası"
            labelStyle={globalStyles.label}
            disabled
            value={customer.phone_number}
            style={globalStyles.input}
            onChangeText={text => handleInputChange('phone_number', text)}
          />
          <Input
            ref={emailRef}
            onSubmitEditing={() => locationRef.current.focus()}
            label="E Posta"
            labelStyle={globalStyles.label}
            disabled
            value={customer.email}
            style={globalStyles.input}
            onChangeText={text => handleInputChange('email', text)}
          />
          <Input
            ref={locationRef}
            onSubmitEditing={() => balanceRef.current.focus()}
            label="Konum"
            labelStyle={globalStyles.label}
            disabled
            value={customer.address}
            style={globalStyles.inputMultiLine}
            multiline
            onChangeText={text => handleInputChange('address', text)}
          />
          <Input
            ref={balanceRef}
            onSubmitEditing={() => balanceWhiteSodaRef.current.focus()}
            label="Borç"
            labelStyle={globalStyles.label}
            disabled
            value={customer.balance.toString()}
            style={globalStyles.input}
            onChangeText={text => handleInputChange('balance', text)}
          />
          <Input
            ref={balanceWhiteSodaRef}
            onSubmitEditing={() => balanceYellowSodaRef.current.focus()}
            label="Beyaz Soda Borç"
            labelStyle={globalStyles.label}
            disabled
            value={customer.balance_white_soda.toString()}
            style={globalStyles.input}
            onChangeText={text => handleInputChange('balance_white_soda', text)}
          />
          <Input
            ref={balanceYellowSodaRef}
            label="Sarı Soda Borç"
            labelStyle={globalStyles.label}
            disabled
            value={customer.balance_yellow_soda.toString()}
            style={globalStyles.input}
            keyboardType="number-pad"
            onChangeText={text =>
              handleInputChange('balance_yellow_soda', text)
            }
          />
        </ScrollView>
      )}
      {active === 'Geçmiş Siparişler' && orders.length > 0 && !loading && (
        <View style={styles.formContainer}>
          {orders.map((item, index) => (
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
                  {item.given_white_soda} kasa Beyaz Soda verildi.
                </ListItem.Title>
                <ListItem.Title
                  style={{
                    fontFamily: theme.bold,
                    fontSize: ww(0.04),
                    color: '#708090',
                  }}>
                  {item.given_yellow_soda} kasa Sarı Soda verildi.
                </ListItem.Title>
                <ListItem.Title
                  style={{
                    fontFamily: theme.bold,
                    fontSize: ww(0.04),
                    color: '#708090',
                  }}>
                  Toplam {item.gathered_white_soda + item.gathered_yellow_soda}{' '}
                  kasa alındı.
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
                  {item.gathered_money}₺ alındı. --{' '}
                  {formatDate(item.order_date)}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      )}
      {active === 'Geçmiş Siparişler' && orders.length === 0 && !loading && (
        <View style={styles.formContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: theme.medium,
              color: theme.secondary,
              fontSize: ww(0.035),
            }}>
            Bu müşteriye ait sipariş bulunamadı.
          </Text>
        </View>
      )}
    </View>
  );
};

export default DetailScreen;

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
  formContainer: {
    padding: 16,
    flex: 1,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: theme.secondary, // Use your desired button color
  },
});
