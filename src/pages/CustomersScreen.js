import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { theme, wh, ww } from "../helpers";
import CustomHeader from "../components/CustomHeader";
import { Avatar, Divider, FAB, Icon, SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GetAllCustomers } from "../services/customer";
import { globalStyles } from "../styles";

const CustomersScreen = () => {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const res = await GetAllCustomers();
      setCustomers(res.data); // Assuming that res is an array of customers
      setFilteredCustomers(res.data); // Initialize filteredCustomers with all customers
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const searchCustomers = () => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("DetailScreen", {
            item: item,
          })
        }
      >
        <View style={{ flex: 1 }}>
          <Avatar
            title="AB"
            titleStyle={{
              fontFamily: theme.bold,
              fontSize: ww(0.04),
            }}
            rounded
            size={"medium"}
            containerStyle={{ backgroundColor: theme.secondary }}
          />
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.info}>{item.customer_name}</Text>
        </View>
        <View
          style={{
            backgroundColor: theme.secondary,
            padding: ww(0.02),
            marginRight: ww(0.03),
            borderRadius: 10,
          }}
        >
          <Icon name="phone" color={theme.white} size={ww(0.05)} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />

      <SearchBar
        placeholder="Müşteri ara..."
        onChangeText={(text) => setSearch(text)}
        containerStyle={{ backgroundColor: theme.white }}
        platform={Platform.OS}
        onClear={() => setFilteredCustomers(customers)}
        value={search}
        onSubmitEditing={searchCustomers}
      />

      <FlatList
        data={filteredCustomers}
        ItemSeparatorComponent={<Divider width={0.5} color={theme.secondary} />}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <View style={styles.fab}>
        <FAB
          placement="right"
          size="small"
          onPress={() => navigation.navigate("AddCustomer")}
          color={theme.secondary}
          icon={{
            name: "plus",
            type: "entypo",
            color: "white",
          }}
        />
      </View>
    </View>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  item: {
    paddingHorizontal: ww(0.03),
    flexDirection: "row",
    justifyContent: "space-between",
    height: wh(0.1),
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: theme.bold,
    fontSize: ww(0.045),
    color: theme.secondary,
  },
  info: {
    marginTop: 5,
    fontFamily: theme.medium,
    fontSize: ww(0.035),
    color: theme.secondary,
  },
  phone: {
    fontSize: ww(0.035),
    fontFamily: theme.medium,
    color: theme.secondary,
  },
  fab: {
    position: "absolute",
    bottom: wh(0.03),
    right: ww(0.05),
  },
});
