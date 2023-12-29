import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { theme, ww } from "../helpers";
import CustomHeader from "../components/CustomHeader";
import { Button, Divider, Image, Input, ListItem } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalStyles } from "../styles";
import { UpdateCustomerService } from "../services/customer";
import { GetOrdersByCustomerIdService } from "../services/orders";

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const customer = route.params.item;
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });
  const [formChanged, setFormChanged] = useState(false);
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState("Müşteri Bilgisi");
  const nameRef = useRef();
  const customerNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const locationRef = useRef();

  useEffect(() => {
    getOrders(customer.id);
  }, []);

  const getOrders = async (id) => {
    const response = await GetOrdersByCustomerIdService(id);
    if (response.status) {
      setOrders(response.data);
    } else {
      Alert.alert("Siparişler getirilirken bir hata oluştu");
    }
    console.log(response);
  };

  const handleInputChange = (field, value) => {
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [field]: value,
    }));

    if (field === "location" && value === editedCustomer.location) {
      setFormChanged(false);
    } else {
      setFormChanged(true);
    }
  };

  const handleSave = async () => {
    if (
      !editedCustomer.name ||
      !editedCustomer.phone_number ||
      !editedCustomer.email ||
      !editedCustomer.location ||
      !editedCustomer.customer_name
    ) {
      Alert.alert("Müşteri düzenleme başarısız. Lütfen tüm alanları doldurun.");
      return;
    }

    const payload = {
      name: editedCustomer.name,
      customer_name: editedCustomer.customer_name,
      phone_number: editedCustomer.phone_number,
      email: editedCustomer.email,
      location: editedCustomer.location,
    };

    const response = await UpdateCustomerService(payload, customer.id);
    if (response.status === true) {
      Alert.alert("Müşteri düzenleme başarılı.");
      formChanged(false);
    } else {
      Alert.alert(
        "Müşteri düzenleme başarısız oldu. Lütfen internet bağlantınızı kontrol ediniz."
      );
    }
  };
  return (
    <View style={styles.container}>
      <CustomHeader title={customer.name} left navigation={navigation} />
      <View style={styles.tabContainer}>
        <TouchableWithoutFeedback
          onPress={() => setActive("Müşteri Bilgisi")}
          containerStyle={{
            ...styles.tabItem,
            backgroundColor:
              active === "Müşteri Bilgisi" ? theme.main : theme.secondary,
          }}
        >
          <Text style={{ ...styles.tabText }}>Müşteri Bilgisi</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => setActive("Geçmiş Siparişler")}
          containerStyle={{
            ...styles.tabItem,
            backgroundColor:
              active === "Geçmiş Siparişler" ? theme.main : theme.secondary,
          }}
        >
          <Text style={styles.tabText}>Geçmiş Siparişler</Text>
        </TouchableWithoutFeedback>
      </View>
      {active === "Müşteri Bilgisi" && (
        <View style={styles.formContainer}>
          <Input
            ref={nameRef}
            onSubmitEditing={() => customerNameRef.current.focus()}
            label="Firma Adı"
            value={editedCustomer.name}
            style={globalStyles.input}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <Input
            ref={customerNameRef}
            onSubmitEditing={() => phoneRef.current.focus()}
            label="Müşteri Adı Soyadı"
            value={editedCustomer.customer_name}
            style={globalStyles.input}
            onChangeText={(text) => handleInputChange("customer_name", text)}
          />
          <Input
            ref={phoneRef}
            onSubmitEditing={() => emailRef.current.focus()}
            label="Telefon Numarası"
            value={editedCustomer.phone_number}
            style={globalStyles.input}
            onChangeText={(text) => handleInputChange("phone_number", text)}
          />
          <Input
            ref={emailRef}
            onSubmitEditing={() => locationRef.current.focus()}
            label="E Posta"
            value={editedCustomer.email}
            style={globalStyles.input}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Input
            ref={locationRef}
            label="Konum"
            value={editedCustomer.location}
            style={globalStyles.inputMultiLine}
            multiline
            onChangeText={(text) => handleInputChange("location", text)}
          />
          {formChanged === true && (
            <Button
              title="Kaydet"
              onPress={handleSave}
              titleStyle={{ fontFamily: theme.medium }}
              placeholderTextColor={theme.grey}
              buttonStyle={styles.saveButton}
            />
          )}
        </View>
      )}
      {active === "Geçmiş Siparişler" && orders.length > 0 && (
        <View style={styles.formContainer}>
          {orders.map((item, index) => (
            <ListItem key={index}>
              <ListItem.Content>
                <ListItem.Title>{item.item_count} adet verildi.</ListItem.Title>
                <ListItem.Subtitle>
                  {item.money_gathered}₺ alındı. -- {item.date}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      )}
      {active === "Geçmiş Siparişler" && orders.length === 0 && (
        <View style={styles.formContainer}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: theme.medium,
              fontSize: ww(0.035),
            }}
          >
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
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tabItem: {
    padding: ww(0.03),
    margin: ww(0.01),
    borderRadius: 4,
    flex: 1,
  },
  tabText: {
    textAlign: "center",
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
