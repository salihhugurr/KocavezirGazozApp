import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Icon, Image } from "react-native-elements";
import { theme, ww } from "../helpers";
import CustomHeader from "../components/CustomHeader";

const DonateScreen = () => {
  const [amount, setAmount] = useState();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomHeader />
        <View
          style={{
            marginVertical: 30,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Icon
            type="font-awesome-5"
            name="donate"
            size={48}
            color={theme.main}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "400",
              color: theme.secondary,
            }}
          >
            İhtiyaç sahibi insanlar için bağış yapabilirsiniz.
          </Text>
        </View>

        <TextInput
          keyboardType="number-pad"
          placeholder="Miktar Giriniz"
          style={{
            alignSelf: "center",
            marginVertical: 20,
            paddingHorizontal: 15,
            fontFamily: theme.medium,
            fontSize: ww(0.04),
            width: 150,
            height: 40,
            textAlign: "center",
            paddingVertical: 6,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "grey",
          }}
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={setAmount}
        >
          {amount}
        </TextInput>
        <TouchableOpacity
          style={{
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: theme.success,
            padding: 10,
            minWidth: 200,
            marginTop: 20,
            borderRadius: 4,
          }}
          onPress={() => console.log("Butona Basıldı")}
        >
          <Text
            style={{ fontSize: 20, fontFamily: theme.bold, color: "#FEFEFE" }}
          >
            {amount ? amount : 0} TL Bağış Yap
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DonateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
});
