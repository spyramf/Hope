import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Padding, Border, FontSize } from "../../GlobalStyles";
import { useState } from "react";



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const Upi_pay = () => {
    const navigation = useNavigation();

    return (

        <View style={styles.text_row_c}>
            <View style={styles.textrow}>
                <Text style={styles.pleaseUse}> Please Use </Text>
                <Text style={styles.pageTitle8Typo}>AXIS BANK XXXX9759</Text>
                <Text style={styles.pleaseUse}> Account Only</Text>
            </View>



            <Pressable onPress={() => navigation.navigate("Home")}>
                <Text style={[styles.setup_pay]}> Setup Auto Pay </Text>
            </Pressable>
        </View>
    );

};

const styles = StyleSheet.create({



    setup_pay: {
        color: Color.colorWhite,
        fontSize: FontSize.size_lg,
        textAlign: "center",
      
        fontWeight: "700",
        backgroundColor: Color.colorMediumseagreen_100,
        borderRadius: Border.br_3xs,
        paddingHorizontal: Padding.p_3xs,
        paddingVertical: Padding.p_7xs,
        marginHorizontal: "25%",
        marginTop: "2%",
    },


    textrow: {
        fontSize: FontSize.size_2xs,
        color: Color.colorSteelblue_100,
        textAlign: "center",
        flexDirection: "row",
    },
    text_row_c: {
        justifyContent: "center",
        alignItems: "center",
    },

    pleaseUse: {

    },


    pageTitle8Typo: {

        fontWeight: "700",
    },

});

export default Upi_pay;
