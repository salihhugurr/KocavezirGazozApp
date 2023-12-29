import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme, wh, ww } from "../../helpers";
import { Icon } from "react-native-elements";
import HomeScreen from "../../pages/HomeScreen";
import CustomersScreen from "../../pages/CustomersScreen";

const Tab = createBottomTabNavigator();

const Sell = () => <View style={{ flex: 1, backgroundColor: theme.white }} />;
const TabRoutes = () => {
  const screens = [
    { name: "Home", component: HomeScreen, tabName: "Anasayfa" },
    { name: "SellBottom", component: Sell, tabName: "Satış" },
    { name: "Customers", component: CustomersScreen, tabName: "Müşteriler" },
  ];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon = (
            <Icon
              type="feather"
              name="home"
              size={ww(0.05)}
              color={focused ? theme.main : theme.secondary}
            />
          );

          if (route.name === "Satış") {
            icon = (
              <Icon
                type="font-awesome-5"
                name="plus"
                containerStyle={{
                  position: "absolute",
                  bottom: 10,
                  zIndex: 2,
                  backgroundColor: focused ? "blue" : theme.secondary,
                  borderWidth: route.name === "Satış" ? 1 : 0,
                  padding: route.name === "Satış" ? ww(0.03) : 0,
                  borderRadius: route.name === "Satış" ? 100 : 0,
                  borderColor: route.name === "Satış" ? "blue" : color,
                }}
                size={ww(0.05)}
                color={focused ? theme.main : theme.white}
              />
            );
          } else if (route.name === "Müşteriler") {
            icon = (
              <Icon
                type="font-awesome-5"
                name="building"
                size={ww(0.05)}
                color={focused ? theme.main : theme.secondary}
              />
            );
          }
          return (
            <View
              style={{
                gap: ww(0.01),
                marginLeft: route.name === "Anasayfa" ? ww(0.05) : 0,
                marginRight: route.name === "Firmalar" ? ww(0.05) : 0,
                backgroundColor: theme.white,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {icon}
              {route.name !== "Satış" && (
                <Text
                  style={{
                    fontSize: ww(0.03),
                    flex: 1,
                    width: "100%",
                    fontFamily: theme.bold,
                    color: focused ? theme.main : theme.secondary,
                  }}
                >
                  {route.name}
                </Text>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: theme.dark,
        tabBarInactiveTintColor: theme.dark50,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: wh(0.1),
          padding: wh(0.01),
          justifyContent: "center",
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: theme.grey,
        },
      })}
    >
      {screens.map((screen) => {
        if (screen.tabName === "Satış") {
          return (
            <Tab.Screen
              options={{ headerShown: false }}
              key={55}
              name={screen.tabName}
              component={screen.component}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate("SellStack");
                },
              })}
            />
          );
        } else {
          return (
            <Tab.Screen
              options={{ headerShown: false }}
              key={screen.name}
              name={screen.tabName}
              component={screen.component}
            />
          );
        }
      })}
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({});
