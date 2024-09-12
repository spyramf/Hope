import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Color, Border } from "../../GlobalStyles";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const OnBtn = (props) => {
  const { title, handelSubmit } = props;

  return (
    <TouchableOpacity
      onPress={handelSubmit}
      style={styles.button}
      activeOpacity={0.8} // Visual feedback on press
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#31a062", // Primary button color
    borderRadius: Border.br_xl, // Rounded corners
    paddingVertical: screenHeight * 0.02, // Vertical padding
    paddingHorizontal: screenWidth * 0.1, // Horizontal padding for better touch area
    alignItems: "center",
    justifyContent: "center",
    marginVertical: screenHeight * 0.01, // Vertical margin for spacing
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 18, // Slightly smaller font size for better fit
    fontWeight: "700", // Bold font weight
    textAlign: "center",
  },
});

export default OnBtn;
