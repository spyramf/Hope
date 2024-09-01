import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  FontFamily,
  FontSize,
  Color,
  Padding,
  Border,
} from "../../GlobalStyles";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";



const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const LinkBankAccount = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", marginVertical: "auto" }}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonRow}>
            <Image
              style={styles.phonePeLogo1Icon}
              source={require("../../screens/AppImage/AutoPay/upi.png")}
            />
            <Text style={styles.textStyle}>Link Bank Account Using UPI</Text>
            <AntDesign name="right" size={32} color="#2E436C"  />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#2E436C",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            margin: 30,
          }}
        >
          Or
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BankDetails")}
        >
          <View style={styles.buttonRow}>
            <Image
              style={styles.phonePeLogo1Icon}
              source={require("../../screens/AppImage/AutoPay/balance.png")}
            />
            <Text style={styles.textStyle}>Link Bank Account Manually</Text>
            <AntDesign name="right" size={32} color="#2E436C"  />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: Padding.p_3xs,
    paddingTop: Padding.p_13xl,
  },
  textStyle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E436C",
  },

  button: {
    backgroundColor: "#E7E7E7",
    borderRadius: Border.br_xl,
    paddingVertical: screenHeight * 0.02,
    alignItems: "center",
  
    justifyContent: "space-between",
    textAlign: "center",
  },
  phonePeLogo1Icon: {
    width: screenWidth * 0.07,
    height: screenWidth * 0.06,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default LinkBankAccount;
