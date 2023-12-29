import {
  Alert,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme, wh, ww } from "../helpers";
import CustomHeader from "../components/CustomHeader";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Divider, Icon, Input } from "react-native-elements";
import { GetAllCustomers } from "../services/customer";
import { globalStyles } from "../styles";
import { AddOrderService } from "../services/orders";

const SellScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const [itemCount, setItemCount] = useState(0);
  const [moneyGathered, setMoneyGathered] = useState(0);
  const numberRef = useRef();
  const moneyRef = useRef();
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const res = await GetAllCustomers();
      setData(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSave = async () => {
    if (!itemCount || !value || !moneyGathered) {
      console.log(itemCount, value, moneyGathered);
      Alert.alert("Satış işlemi kaydedilemedi. Lütfen tüm alanları doldurun.");
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(currentDate.getUTCDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const payload = {
      customer_id: value,
      date: formattedDate,
      item_count: itemCount,
      money_gathered: moneyGathered,
    };

    console.log(payload);

    const response = await AddOrderService(payload);
    console.log(response);
    if (response.status === true) {
      Alert.alert("Satış başarılı bir şekilde oluşturuldu.");
      setItemCount(0);
      setMoneyGathered(0);
    } else {
      Alert.alert(
        "Satış işlemi başarısız. Lütfen internet bağlantınızı kontrol ediniz."
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        right
        leftNavigation={() => navigation.goBack()}
        navigation={navigation}
        title={"Satış"}
      />

      <View style={styles.formContainer}>
        <Text
          style={{
            ...globalStyles.input,
            color: "#03002E",
            marginLeft: ww(0.025),
            fontFamily: theme.bold,
            marginBottom: 5,
            opacity: 0.4,
          }}
        >
          Müşteri
        </Text>
        <Dropdown
          data={data}
          placeholderStyle={{ color: theme.secondary, opacity: 0.5 }}
          search={data.length > 0 ? true : false}
          labelField="name"
          valueField="id"
          placeholder="Müşteri seçin."
          style={{ paddingHorizontal: ww(0.025) }}
          searchPlaceholder="Müşteri arayın..."
          value={value}
          onChange={(item) => {
            setValue(item.id);
          }}
        />
        <Divider style={{ marginVertical: wh(0.01) }} />
        <Input
          ref={numberRef}
          keyboardType="number-pad"
          label="Satılan Gazoz"
          labelStyle={{ color: "#03002E", opacity: 0.4 }}
          placeholder="Satılan gazozu giriniz."
          value={itemCount}
          style={globalStyles.input}
          placeholderTextColor={theme.grey}
          onSubmitEditing={() => moneyRef.current.focus()}
          onChangeText={(text) => setItemCount(text)}
        />
        <Input
          ref={moneyRef}
          keyboardType="number-pad"
          label="Alınan Para"
          labelStyle={{ color: "#03002E", opacity: 0.4 }}
          placeholder="Alınan parayı giriniz."
          value={moneyGathered}
          style={globalStyles.input}
          placeholderTextColor={theme.grey}
          onSubmitEditing={handleSave}
          onChangeText={(text) => setMoneyGathered(text)}
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

export default SellScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  formContainer: {
    padding: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: theme.secondary, // Use your desired button color
  },
});
