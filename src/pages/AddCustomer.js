import React, { useRef, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles";
import { theme } from "../helpers";
import { AddCustomerService } from "../services/customer";

const AddCustomer = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const nameRef = useRef();
  const customerNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const locationRef = useRef();

  const handleSave = async () => {
    if (!name || !customerName || !phoneNumber || !email || !location) {
      Alert.alert("Müşteri kaydetme başarısız. Lütfen tüm alanları doldurun.");
      return;
    }

    const payload = {
      name,
      customer_name: customerName,
      phone_number: phoneNumber,
      email,
      location,
    };

    const response = await AddCustomerService(payload);
    if (response.status === true) {
      Alert.alert("Müşteri başarılı bir şekilde oluşturuldu.");
      setName("");
      setCustomerName("");
      setPhoneNumber("");
      setEmail("");
      setLocation("");
    } else {
      Alert.alert(
        "Müşteri kaydetme başarısız. Lütfen internet bağlantınızı kontrol ediniz."
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={"Müşteri Ekle"} left navigation={navigation} />

      <View style={styles.formContainer}>
        <Input
          ref={nameRef}
          label="Firma Adı"
          placeholder="Firma adını giriniz"
          value={name}
          style={globalStyles.input}
          placeholderTextColor={theme.grey}
          onSubmitEditing={() => customerNameRef.current.focus()}
          onChangeText={(text) => setName(text)}
        />
        <Input
          ref={customerNameRef}
          label="Müşterinin Adı"
          placeholder="Müşterinin adını giriniz"
          value={customerName}
          style={globalStyles.input}
          placeholderTextColor={theme.grey}
          onSubmitEditing={() => phoneRef.current.focus()}
          onChangeText={(text) => setCustomerName(text)}
        />
        <Input
          ref={phoneRef}
          label="Telefon Numarası"
          placeholder="Müşterinin telefon numarasını giriniz"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          style={globalStyles.input}
          placeholderTextColor={theme.grey}
          onSubmitEditing={() => emailRef.current.focus()}
          keyboardType="numeric"
        />
        <Input
          ref={emailRef}
          onSubmitEditing={() => locationRef.current.focus()}
          label="E Posta"
          placeholder="Müşterinin e postasını giriniz"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          style={globalStyles.input}
          placeholderTextColor={theme.grey}
          keyboardType="email-address"
        />
        <Input
          ref={locationRef}
          onSubmitEditing={handleSave}
          label="Konum"
          placeholder="Adres giriniz"
          multiline
          value={location}
          style={globalStyles.inputMultiLine}
          placeholderTextColor={theme.grey}
          onChangeText={(text) => setLocation(text)}
        />

        <Button
          title="Kaydet"
          onPress={handleSave}
          titleStyle={{ fontFamily: theme.medium }}
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
    backgroundColor: "#fff", // Use your theme.white here if needed
  },
  formContainer: {
    padding: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: theme.secondary, // Use your desired button color
  },
});

export default AddCustomer;
