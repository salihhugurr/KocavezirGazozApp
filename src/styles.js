const { StyleSheet } = require("react-native");
const { wh, theme, ww } = require("./helpers");

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: ww(0.05),
    fontFamily: theme.bold,
    textAlign: "center",
  },
  input: {
    fontSize: ww(0.04),
    fontFamily: theme.medium,
    color: theme.secondary,
  },
  inputMultiLine: {
    height: wh(0.1),
    fontSize: ww(0.04),
    fontFamily: theme.medium,
    color: theme.secondary,
  },
});
