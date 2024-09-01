import React from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import {  Border,FontSize ,Padding} from "../../GlobalStyles";


const { height: screenHeight } = Dimensions.get("window");


const Inline = props => {


    const { leftHeading, placeholder,error  } = props;



    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.Heading}>{leftHeading}</Text>
          {error ? (
            <Text style={[styles.Heading, { color: "red" }]}>{error}</Text>
          ) : null}
        </View>

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#828282"
          {...props}
        />
      </View>
    );
}
const styles = StyleSheet.create({
  Heading: {
    fontSize: FontSize.size_base,
    color: "#2e436c",
    fontWeight: "500",
    lineHeight: screenHeight * 0.03,

    marginBottom: screenHeight * 0.01,
  },

  input: {
    flexDirection: "row",
    height: screenHeight * 0.08,
    fontSize: FontSize.size_5xl,
    color: "#2e436c",
    borderWidth: 1,
    borderColor: "#2e436c",
    borderRadius: Border.br_xl,
    paddingHorizontal: Padding.p_xs,
  },
});

export default Inline;