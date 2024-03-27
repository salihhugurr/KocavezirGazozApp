import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme, wh, ww} from '../helpers';
import CustomHeader from '../components/CustomHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Divider, Icon, Input} from 'react-native-elements';
import {GetAllCustomers} from '../services/customer';
import {globalStyles} from '../styles';
import {AddOrderService} from '../services/orders';

const SellScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const [price, setPrice] = useState(0);
  const [moneyGathered, setMoneyGathered] = useState(0);
  const [givenWhiteSoda, setGivenWhiteSoda] = useState(0);
  const [givenYellowSoda, setGivenYellowSoda] = useState(0);
  const [gatheredWhiteSoda, setGatheredWhiteSoda] = useState(0);
  const [gatheredYellowSoda, setGatheredYellowSoda] = useState(0);
  const gatheredMoneyRef = useRef();
  const givenWhiteRef = useRef();
  const givenYellowRef = useRef();
  const gatheredWhiteRef = useRef();
  const gatheredYellowRef = useRef();
  const priceRef = useRef();
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const res = await GetAllCustomers();
      setData(res.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSave = async () => {
    if (
      !price ||
      !value ||
      !moneyGathered ||
      !givenWhiteSoda ||
      !givenYellowSoda ||
      !gatheredWhiteSoda ||
      !gatheredYellowSoda ||
      !price
    ) {
      Alert.alert('Satış işlemi kaydedilemedi. Lütfen tüm alanları doldurun.');
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getUTCDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const payload = {
      customer_id: value,
      order_date: formattedDate,
      money_gathered: moneyGathered,
      price: price, // Ürün Fiyatı
      given_white_soda: givenWhiteSoda, // teslim edilen beyaz soda
      given_yellow_soda: givenYellowSoda, //teslim edilen sarı soda
      gathered_white_soda: gatheredWhiteSoda, // teslim alınan beyaz soda
      gathered_yellow_soda: gatheredYellowSoda, // teslim alınan sarı soda
    };

    const response = await AddOrderService(payload);
    if (response.status === true) {
      Alert.alert('Satış başarılı bir şekilde oluşturuldu.');
      navigation.goBack();
    } else {
      Alert.alert(
        'Satış işlemi başarısız. Lütfen internet bağlantınızı kontrol ediniz.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        right
        leftNavigation={() => navigation.goBack()}
        navigation={navigation}
        title={'Satış'}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.white,
        }}>
        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              ...globalStyles.input,
              color: '#03002E',
              marginLeft: ww(0.025),
              fontFamily: theme.bold,
              marginBottom: 5,
              opacity: 0.4,
            }}>
            Müşteri
          </Text>
          <Dropdown
            data={data}
            placeholderStyle={{color: theme.secondary, opacity: 0.5}}
            search={data.length > 0 ? true : false}
            labelField="name"
            valueField="id"
            placeholder="Müşteri seçin."
            style={{paddingHorizontal: ww(0.025)}}
            searchPlaceholder="Müşteri arayın..."
            value={value}
            onChange={item => {
              setValue(item.id);
            }}
          />
          <Divider style={{marginVertical: wh(0.01)}} />
          <Input
            ref={givenWhiteRef}
            keyboardType="number-pad"
            label="Teslim Edilen Beyaz Soda"
            labelStyle={{color: '#03002E', opacity: 0.4}}
            placeholder="Teslim edilen beyaz soda adedi giriniz."
            value={givenWhiteSoda.toString()}
            style={globalStyles.input}
            placeholderTextColor={theme.grey}
            onSubmitEditing={() => givenYellowRef.current.focus()}
            onChangeText={text => setGivenWhiteSoda(text)}
          />
          <Input
            ref={givenYellowRef}
            keyboardType="number-pad"
            label="Teslim Edilen Sarı Soda"
            labelStyle={{color: '#03002E', opacity: 0.4}}
            placeholder="Teslim edilen sarı soda adedi giriniz."
            value={givenYellowSoda.toString()}
            style={globalStyles.input}
            placeholderTextColor={theme.grey}
            onSubmitEditing={() => gatheredWhiteRef.current.focus()}
            onChangeText={text => setGivenYellowSoda(text)}
          />
          <Input
            ref={gatheredWhiteRef}
            keyboardType="number-pad"
            label="Teslim Alınan Beyaz Soda"
            labelStyle={{color: '#03002E', opacity: 0.4}}
            placeholder="Teslim alınan beyaz soda adedi giriniz."
            value={gatheredWhiteSoda.toString()}
            style={globalStyles.input}
            placeholderTextColor={theme.grey}
            onSubmitEditing={() => gatheredYellowRef.current.focus()}
            onChangeText={text => setGatheredWhiteSoda(text)}
          />
          <Input
            ref={gatheredYellowRef}
            keyboardType="number-pad"
            label="Teslim Alınan Sarı Soda"
            labelStyle={{color: '#03002E', opacity: 0.4}}
            placeholder="Teslim alınan sarı soda adedi giriniz."
            value={gatheredYellowSoda.toString()}
            style={globalStyles.input}
            placeholderTextColor={theme.grey}
            onSubmitEditing={() => gatheredMoneyRef.current.focus()}
            onChangeText={text => setGatheredYellowSoda(text)}
          />
          <Input
            ref={gatheredMoneyRef}
            keyboardType="number-pad"
            label="Alınan Para"
            labelStyle={{color: '#03002E', opacity: 0.4}}
            placeholder="Alınan parayı giriniz."
            value={moneyGathered.toString()}
            style={globalStyles.input}
            placeholderTextColor={theme.grey}
            onSubmitEditing={() => priceRef.current.focus()}
            onChangeText={text => setMoneyGathered(text)}
          />
          <Input
            ref={priceRef}
            keyboardType="number-pad"
            label="Toplam Ürün Fiyatı"
            labelStyle={{color: '#03002E', opacity: 0.4}}
            placeholder="Toplam ürün fiyatını giriniz."
            value={price.toString()}
            style={globalStyles.input}
            placeholderTextColor={theme.grey}
            onSubmitEditing={handleSave}
            onChangeText={text => setPrice(text)}
          />
          <Button
            title="Kaydet"
            onPress={handleSave}
            titleStyle={{fontFamily: theme.medium}}
            placeholderTextColor={theme.grey}
            buttonStyle={styles.saveButton}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SellScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  saveButton: {
    marginVertical: wh(0.05),
    backgroundColor: theme.secondary, // Use your desired button color
  },
});
