import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { FontSize ,Padding} from "../../GlobalStyles";


const { height: screenHeight } = Dimensions.get("window");


const UnEditInLine = (props) => {
  const { leftHeading, rightHeading, } = props;

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.Heading}>{leftHeading}</Text>
      </View>

      <Text style={styles.input}>{rightHeading}</Text>
    </View>
  );
};
const styles = StyleSheet.create({

  Heading: {
    fontSize: FontSize.size_base,
    color: "#2e436c",
    fontWeight: "500",
    lineHeight: screenHeight * 0.03,
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.001,
    marginLeft: 8,
  },

  input: {
    flexDirection: "row",
    height: screenHeight * 0.06,
    fontSize: FontSize.size_5xl,
    color: "#2E436C",
    borderWidth: 1,
    borderColor: "#2E436C",
    borderRadius: 10,
    paddingHorizontal: Padding.p_xs,
    margin: 8,
    textAlignVertical: "center",
  },

});

export default UnEditInLine;