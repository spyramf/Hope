import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, Border, FontSize } from "../../GlobalStyles";




const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const DirectPay = () => {
    const navigation = useNavigation();

    return (

        <View style={styles.text_row_c}>
            <View style={styles.textrow}>
                <Text style={styles.pleaseUse}> Please Select </Text>
                <Text style={styles.pageTitle8Typo}>Payment</Text>
                <Text style={styles.pleaseUse}> Method</Text>
            </View>



            <Pressable onPress={() => navigation.navigate("Home")}>
                <Text style={[styles.setup_pay]}> Select To Pay </Text>
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

export default DirectPay;
