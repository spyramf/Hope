import React from "react";
import { StyleSheet, View, Text,  Dimensions, } from "react-native";
import { Color, FontSize, Padding, Border } from "../../GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");


const UnEditAble = props => {

    const { leftHeading, rightHeading, } = props;



    return (


        <View style={{ flexDirection: "column", justifyContent: 'space-between', marginLeft: screenWidth * 0.02, marginRight: screenWidth * 0.02 }}>
                <Text style={styles.pageTitle1}>{leftHeading}</Text>
          

            <Text style={styles.input1}>
                {rightHeading}
            </Text>
            </View>
    


    )
}
const styles = StyleSheet.create({
  input1: {
    flexDirection: "row",
    height: screenHeight * 0.06,
    fontSize: FontSize.size_5xl,
    color: "#2E436C",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2E436C",
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xs,
    width: screenWidth * 0.45,
    textAlignVertical: "center",
  },

  pageTitle1: {
    fontSize: FontSize.size_base,
    color: Color.colorSteelblue_100,
    fontWeight: "500",
    lineHeight: screenHeight * 0.03,
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
  },
});

export default UnEditAble;