import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");




const SelectOnBtn = props => {
    const { title, handelSubmit } = props;
    const navigation = useNavigation();
    return (




        <TouchableOpacity onPress={handelSubmit}>
                <Text style={styles.button} >{title} </Text>
        </TouchableOpacity>




    )
}
const styles = StyleSheet.create({



    button: {

        flexDirection: "row",
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        paddingVertical: screenHeight * 0.025,
        alignItems: "center",
        justifyContent: "center",
        color: "#2E436C",
        textAlign: "center",
        padding: screenHeight * 0.001,
        fontSize: 22,
        fontWeight: "700",
        width: screenWidth * 0.43,
        marginBottom: screenHeight * 0.025

    },
});

export default SelectOnBtn;