import { StyleSheet } from "react-native";
import React from "react";
import TabRoutes from "./TabRoutes/TabRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SellScreen from "../pages/SellScreen";
import AddCustomer from "../pages/AddCustomer";
import DetailScreen from "../pages/DetailScreen";
import Login from "../pages/Login";
import { useAuth } from "../context";

const Stack = createStackNavigator();
const SellStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, presentation: "modal" }}
  >
    <Stack.Screen name="Sell" component={SellScreen} />
  </Stack.Navigator>
);

const Router = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user?.role ? (
          <Stack.Screen name="App" component={TabRoutes} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="SellStack" component={SellStack} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
const styles = StyleSheet.create({});
