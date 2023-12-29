import React from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, Header as HeaderRNE, Icon, Text } from "react-native-elements";
import { convertToInitials, theme, wh, ww } from "../helpers";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({
  title,
  right,
  left,
  leftNavigation,
  navigation,
  onPressProfile,
  center,
}) => {
  const nav = useNavigation();
  return (
    <>
      <HeaderRNE
        containerStyle={styles.headerContainer}
        leftContainerStyle={{ width: "100%" }}
        leftComponent={
          center ? (
            <></>
          ) : left ? (
            <TouchableOpacity
              style={styles.headerLeft}
              onPress={() =>
                !leftNavigation ? navigation.goBack() : leftNavigation()
              }
            >
              <Icon
                name="chevron-left"
                type="feather"
                color={theme.secondary}
                size={ww(0.06)}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        rightComponent={
          right ? (
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() =>
                !leftNavigation ? navigation.goBack() : leftNavigation()
              }
            >
              <Icon
                name="x"
                type="feather"
                color={theme.secondary}
                size={ww(0.06)}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        centerComponent={
          right && title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : !left && !center ? (
            <TouchableWithoutFeedback
              onPress={() => nav.navigate("App", { screen: "Map" })}
            >
              <Image
                source={{
                  uri: "https://instagram.fada6-1.fna.fbcdn.net/v/t51.2885-19/69259801_497925487443958_3680032441407373312_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fada6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=Z8_C6LxML9YAX-qnp9Z&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCkOz51M5NorVKwA5MP8jwKMUCZDg53IqmLj5dSiGF56w&oe=6591EEC8&_nc_sid=8b3546",
                }}
                style={{ width: ww(0.15), height: ww(0.15) }}
              />
            </TouchableWithoutFeedback>
          ) : title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : (
            <></>
          )
        }
      />
      <View
        style={{
          width: "100%",
          height: 0.2,
          marginTop: 5,
          backgroundColor: theme.secondary,
          marginBottom: 2,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: theme.white,
    height: wh(0.14),
    width: "100%",
    paddingHorizontal: 15,
  },
  heading: {
    color: "white",
    fontSize: ww(0.04),
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: ww(0.04),
    flexDirection: "row",
    marginRight: ww(0.02),
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerLeft: {
    width: "200%",
    flexDirection: "row",
    gap: ww(0.03),
    alignItems: "center",
  },

  titleText: {
    flex: 1,
    fontSize: ww(0.045),
    color: theme.dark,
    alignItems: "center",
    textAlign: "center",
    fontFamily: theme.medium,
  },
  descText: {
    fontSize: ww(0.02),
    color: theme.red,
    width: "100%",
    fontFamily: theme.medium,
  },
});

export default CustomHeader;
