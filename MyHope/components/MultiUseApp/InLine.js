import React from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import { Border, FontSize, Padding } from "../../GlobalStyles";

const { height: screenHeight } = Dimensions.get("window");

const Inline = (props) => {
  const { leftHeading, placeholder, error } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{leftHeading}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#828282"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Spacing between elements
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8, // Space between heading and input
  },
  heading: {
    fontSize: FontSize.size_base,
    color: "#2e436c",
    fontWeight: "500",
    lineHeight: screenHeight * 0.03,
  },
  error: {
    color: "red",
    fontSize: FontSize.size_sm, // Smaller font size for error
  },
  input: {
    height: screenHeight * 0.08,
    fontSize: FontSize.size_5xl,
    color: "#2e436c",
    borderWidth: 1,
    borderColor: "#2e436c",
    borderRadius: Border.br_xl,
    paddingHorizontal: Padding.p_xs,
    backgroundColor: "#fff", // White background for input
    paddingVertical: Padding.p_sm, // Additional vertical padding
  },
  inputError: {
    borderColor: "red", // Red border color for error
  },
});

export default Inline;
