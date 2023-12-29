import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { theme, ww } from "../helpers";
import CustomHeader from "../components/CustomHeader";
import { Divider, Image, ListItem } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { GetAllOrders } from "../services/orders";
import { useAuth } from "../context";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState("Geçmiş Siparişler");

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const res = await GetAllOrders();
      console.log(res);
      setOrders(res.data); // Assuming that res is an array of customers
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <ListItem key={index}>
        <ListItem.Content>
          <ListItem.Title>{item.item_count} adet verildi.</ListItem.Title>
          <ListItem.Subtitle>
            {item.money_gathered}₺ alındı. -- {item.date}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      {user.role === "admin" && (
        <View style={styles.tabContainer}>
          <TouchableWithoutFeedback
            onPress={() => setActive("Geçmiş Siparişler")}
            containerStyle={{
              ...styles.tabItem,
              backgroundColor:
                active === "Geçmiş Siparişler" ? theme.main : theme.secondary,
            }}
          >
            <Text style={{ ...styles.tabText }}>Geçmiş Siparişler</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => setActive("Toplam")}
            containerStyle={{
              ...styles.tabItem,
              backgroundColor:
                active === "Toplam" ? theme.main : theme.secondary,
            }}
          >
            <Text style={styles.tabText}>Toplam</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      {user.role === "admin" && active === "Toplam" && (
        <View style={{ flex: 1, padding: 16 }}>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Toplam 257 adet verildi.</ListItem.Title>
              <ListItem.Subtitle>10000₺ alındı.</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      )}
      {active === "Geçmiş Siparişler" && (
        <FlatList
          data={orders}
          ItemSeparatorComponent={
            <Divider width={0.5} color={theme.secondary} />
          }
          keyExtractor={(item) => item.id.toString()}
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
});
