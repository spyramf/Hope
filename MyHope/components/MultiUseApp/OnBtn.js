import React from "react";
import { StyleSheet, View, Text,Dimensions,TouchableOpacity } from "react-native";
import {  Color, Border } from "../../GlobalStyles";


const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");




const OnBtn = props => {
    const { title, handelSubmit } = props;


    return (

        <TouchableOpacity onPress={handelSubmit}>
                <Text style={styles.button} >{title} </Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#31a062",
    borderRadius: Border.br_xl,
    paddingVertical: screenHeight * 0.02,
    alignItems: "center",
    margin: screenHeight * 0.001,
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    padding: screenHeight * 0.001,
    fontSize: 22,
    fontWeight: "700",
  },
});

export default OnBtn;