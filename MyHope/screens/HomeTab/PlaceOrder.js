import React, { useState } from "react";
import { Pressable, Dimensions, StyleSheet, Text, View, TextInput } from "react-native";
import { Image } from "expo-image";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";





const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;








const LupsumpAmount = () => {









  const navigation = useNavigation();


  const [email, setEmail] = useState("");


  return (
    <View style={emobstyle.container}>
      <View style={[emobstyle.component, { width: screenWidth }]}>
      </View>
      <View style={[emobstyle.component, { width: screenHeight }]}>



      </View>






      <View style={emobstyle.header}>

        <Pressable onPress={() => navigation.navigate("FundPage")}>
          <Image style={emobstyle.vectorIcon} source={require("../assets/vector17.png")} />
        </Pressable>

        <View>
          <Text style={emobstyle.mainTitle}> Invest One Time </Text>
        </View>

      </View>










      <View style={emobstyle.buttonrow}>
        <View>
          <Image
            style={styles.frameChild}
            source={require("../assets/sbimfremovebgpreview-41.png")}
          />
        </View>

        <Text style={[styles.fundName]}>
          SBI Small Cap- Growth  -Pradeep Hari Gangurde
        </Text>

      </View>



      <View>
        <Text style={[emobstyle.pageTitle3, { marginTop: screenHeight * 0.01 }]}>Investment Amount </Text>
      </View>

      <TextInput
        style={emobstyle.input1}
        placeholder="₹10000"
        placeholderTextColor="#828282"
        onChangeText={(Text) => setEmail(Text)}
        value={email}
      />


      <View style={[emobstyle.buttonrow, { marginTop: screenHeight * 0.01 }]}>
        <Pressable>
          <Text style={[styles.pageTitle, styles.invest_button]}>
            ₹ 1000
          </Text>
        </Pressable>

        <Pressable>
          <Text style={[styles.pageTitle, styles.invest_button]}>
            ₹ 2000
          </Text>
        </Pressable>


        <Pressable>
          <Text style={[styles.pageTitle, styles.invest_button]}>
            ₹ 3000
          </Text>
        </Pressable>

        <Pressable>
          <Text style={[styles.pageTitle, styles.invest_button]}>
            ₹ 3000
          </Text>
        </Pressable>

      </View>








      <View style={styles.abc}>
        <Pressable onPress={() => navigation.navigate("SIPOrder")}>
          <Text style={emobstyle.button1} >Invest One Time</Text>
        </Pressable>
      </View>



    </View>





  );
};

const styles = StyleSheet.create({

  invest_button: {
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 1,
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: Padding.p_6xs,
    width: 70,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_8xs,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },


  frameChild: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },


  fundName: {
    fontSize: FontSize.size_5xl,
    width: "85%",
    height: screenHeight * 0.1,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    color: "#2E436C",
    textAlignVertical: "center",
  },
  abc: {
    top: screenHeight * 0.15,
  },




});

export default LupsumpAmount;
