import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import CustomHeader from '../components/CustomHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme, wh, ww} from '../helpers';
import {AddCustomerService, UpdateCustomerService} from '../services/customer';

const AddCustomer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('updated');
  const [inputs, setInputs] = useState({
    name: route?.params?.edit ? route.params.customer.name : '',
    customerName: route?.params?.edit
      ? route.params.customer.customer_name
      : '',
    phoneNumber: route?.params?.edit ? route.params.customer.phone_number : '',
    email: route?.params?.edit ? route.params.customer.email : '',
    location: route?.params?.edit ? route.params.customer.address : '',
  });

  const handleInputChange = (key, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const {name, customerName, phoneNumber, email, location} = inputs;
    if (!name || !customerName || !phoneNumber || !email || !location) {
      Alert.alert('Müşteri kaydetme başarısız. Lütfen tüm alanları doldurun.');
      return;
    }

    const payload = {
      name,
      customer_name: customerName,
      phone_number: phoneNumber,
      email,
      address: location,
    };

    if (!route?.params?.edit) {
      // Code for adding customer
      const response = await AddCustomerService(payload);
      if (response.status === true) {
        Alert.alert('Müşteri başarılı bir şekilde oluşturuldu.');
        resetForm();
      } else {
        Alert.alert(
          'Müşteri kaydetme başarısız. Lütfen internet bağlantınızı kontrol ediniz.',
        );
      }
    } else {
      // Code for updating customer
      const response = await UpdateCustomerService(
        payload,
        route.params.customer.id,
      );
      if (response.status === true) {
        Alert.alert('Müşteri bilgileri başarılı bir şekilde güncellendi.');
        navigation.goBack();
      } else {
        Alert.alert(
          'Müşteri düzenleme başarısız. Lütfen internet bağlantınızı kontrol ediniz.',
        );
      }
    }
  };

  const resetForm = () => {
    setInputs({
      name: '',
      customerName: '',
      phoneNumber: '',
      email: '',
      location: '',
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={
          route?.params?.edit
            ? `${route.params.customer.name} Düzenle`
            : 'Müşteri Ekle'
        }
        left
        navigation={navigation}
      />

      <View style={styles.formContainer}>
        <Input
          label="Firma Adı"
          placeholder="Firma adını giriniz"
          value={inputs.name}
          style={styles.input}
          placeholderTextColor={theme.grey}
          onChangeText={text => handleInputChange('name', text)}
        />
        <Input
          label="Müşterinin Adı"
          placeholder="Müşterinin adını giriniz"
          value={inputs.customerName}
          style={styles.input}
          placeholderTextColor={theme.grey}
          onChangeText={text => handleInputChange('customerName', text)}
        />
        <Input
          label="Telefon Numarası"
          placeholder="Müşterinin telefon numarasını giriniz"
          value={inputs.phoneNumber}
          onChangeText={text => handleInputChange('phoneNumber', text)}
          style={styles.input}
          placeholderTextColor={theme.grey}
          keyboardType="numeric"
        />
        <Input
          label="E Posta"
          placeholder="Müşterinin e postasını giriniz"
          value={inputs.email}
          onChangeText={text => handleInputChange('email', text)}
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={theme.grey}
          keyboardType="email-address"
        />
        <Input
          onSubmitEditing={handleSave}
          label="Konum"
          placeholder="Adres giriniz"
          multiline
          value={inputs.location}
          style={styles.inputMultiLine}
          placeholderTextColor={theme.grey}
          onChangeText={text => handleInputChange('location', text)}
        />

        <Button
          title="Kaydet"
          onPress={handleSave}
          titleStyle={{fontFamily: theme.medium}}
          placeholderTextColor={theme.grey}
          buttonStyle={styles.saveButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Use your theme.white here if needed
  },
  formContainer: {
    padding: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: theme.secondary, // Use your desired button color
  },
  title: {
    fontSize: ww(0.05),
    fontFamily: theme.bold,
    textAlign: 'center',
  },
  input: {
    fontSize: ww(0.04),
    fontFamily: theme.medium,
    color: theme.secondary,
  },
  label: {
    fontSize: ww(0.035),
    fontFamily: theme.medium,
    color: 'gray',
  },
  inputMultiLine: {
    height: wh(0.1),
    fontSize: ww(0.04),
    fontFamily: theme.medium,
    color: theme.secondary,
  },
});

export default AddCustomer;
