import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Padding, Border, FontSize } from "../../GlobalStyles";
import { useState } from "react";
import Upi_pay from '../../components/MultiUseApp/Upi_pay'


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;






const AutoPay = () => {
  const navigation = useNavigation();

  const [selectedRadio, setSetectedRadio] = useState(1)

  const skills = [
    {
      id: 1,
      name: (
        <View style={styles.buttonrow}>
          <Image
            style={styles.phonepeLogo1Icon}
            source={require("../../screens/AppImage/AutoPay/phonepe.png")}
          />
          <Text style={styles.note_text}> Phone Pe </Text>
        </View>
      ),
    },

    {
      id: 2,
      name: (
        <View style={styles.buttonrow}>
          <Image
            style={styles.phonepeLogo1Icon}
            source={require("../../screens/AppImage/AutoPay/googlepaylogo.png")}
          />
          <Text style={styles.note_text}> Google Pay </Text>
        </View>
      ),
    },
    {
      id: 3,
      name: (
        <View style={styles.buttonrow}>
          <Image
            style={styles.phonepeLogo1Icon}
            source={require("../../screens/AppImage/AutoPay/upi.png")}
          />
          <Text style={styles.note_text}> UPI </Text>
        </View>
      ),
    },

    {
      id: 4,
      name: (
        <View style={styles.buttonrow}>
          <Image
            style={styles.phonepeLogo1Icon}
            source={require("../../screens/AppImage/AutoPay/debitcard.png")}
          />
          <Text style={styles.note_text}> Debit Card/Net Banking </Text>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>


    
      {/* <View style={styles.header}>
        <View>
          <Text style={styles.mainTitle}> Invest One Time </Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 0.5,
          borderStyle: "dashed",
        }}
      /> */}

      <View style={[styles.box]}>
        <Text style={[styles.pageTypo1]}>Note</Text>

        <View style={styles.buttonrow}>
          <Image
            style={styles.frameInner}
            source={require("../../screens/AppImage/AutoPay/ellipse.png")}
          />
          <Text
            style={[styles.pageLayout]}
          >{`This is a single-time Setup. Payments for your ongoing and forthcoming SIPs will be associated with Autopay.`}</Text>
        </View>

        <View style={styles.buttonrow}>
          <Image
            style={styles.frameInner}
            source={require("../../screens/AppImage/AutoPay/ellipse.png")}
          />
          <Text
            style={[styles.pageLayout]}
          >{`The UPI mode has an Autopay limit of ₹15,000, while the Autopay limit for Net Banking/Debit Card mode is ₹1,00,000.`}</Text>
        </View>

        <View style={styles.buttonrow}>
          <Image
            style={styles.frameInner}
            source={require("../../screens/AppImage/AutoPay/ellipse.png")}
          />
          <Text
            style={[styles.pageLayout]}
          >{`Only the SIP installment will be deducted from your bank account on the scheduled SIP date.`}</Text>
        </View>
      </View>

      <Text
        style={[styles.pageTypo1, { marginBottom: screenWidth * 0.04 }]}
      >{`Setup Auto Pay With `}</Text>

      {skills.map((item, index) => (
        <TouchableOpacity
          key={index}
          on
          onPress={() => setSetectedRadio(item.id)}
        >
          <View style={[styles.box]}>
            <View style={[styles.buttonrow]}>
              <View style={styles.radio}>
                {selectedRadio === item.id ? (
                  <View style={styles.radiobg}></View>
                ) : null}
              </View>

              <Text style={styles.phonepe}> {item.name} </Text>
            </View>

            <View>{selectedRadio === item.id ? <Upi_pay /> : null}</View>
          </View>
        </TouchableOpacity>
      ))}
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

  mainTitle: {
    fontSize: FontSize.size_15xl,
    color: Color.colorSteelblue_100,
    fontWeight: "700",
    margin: screenHeight * 0.02,
  },
  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  note_text: {
    fontWeight: "700",
  },

  setup_pay: {
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    textAlign: "center",
    fontWeight: "700",
    backgroundColor: Color.colorMediumseagreen_100,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_7xs,
    marginHorizontal: "35%",
    marginTop: "2%",
  },
  phonepe: {
    fontSize: 10,
    justifyContent: "flex-start",
    marginHorizontal: "2%",
  },
  radio: {
    height: screenWidth * 0.05,
    width: screenWidth * 0.05,
    borderColor: "#2E436C",
    borderWidth: 2,
    borderRadius: screenWidth * 0.025,
    margin: 10,
  },

  radiobg: {
    backgroundColor: "#2E436C",
    height: screenWidth * 0.035,
    width: screenWidth * 0.035,
    borderRadius: screenWidth * 0.05,
    marginHorizontal: "7%",
    marginVertical: "8%",
    alignItems: "center",
  },

  box: {
    paddingVertical: Padding.p_7xs,
    width: "98%",
    borderColor: Color.colorSteelblue_100,
    borderRadius: Border.br_8xs,
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: Padding.p_6xs,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
    marginBottom: "5%",
    margin: "1%",
  },

  pageLayout: {
    width: "95%",
    marginLeft: screenWidth * 0.02,
    height: screenWidth * 0.1,
    textAlign: "left",
    color: Color.colorSteelblue_100,
    fontSize: FontSize.size_2xs,
    alignItems: "center",
  },

  ellipseParent: {
    flexDirection: "row",
    alignItems: "center",
  },

  frameInner: {
    width: screenWidth * 0.02,
    height: screenWidth * 0.02,
    alignItems: "center",
    marginTop: "-5%",
  },

  textrow: {
    fontSize: FontSize.size_2xs,
    color: Color.colorSteelblue_100,
    textAlign: "center",
    flexDirection: "row",
    marginHorizontal: "25%",
  },

  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  pageTypo1: {
    display: "flex",
    textAlign: "left",
    color: Color.colorSteelblue_100,
    alignItems: "center",
    fontSize: FontSize.size_lg,
    justifyContent: "center",
    flexDirection: "row",
  },

  frameItem: {
    width: "98%",
    height: 2,
    opacity: 0.5,
    marginTop: "1%",
  },

  phonepeLogo1Icon: {
    width: screenWidth * 0.07,
    height: screenWidth * 0.06,
  },

  pleaseUse: {},
});

export default AutoPay;
