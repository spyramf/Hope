import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from 'react'
import {
  Padding,
  FontFamily,
  Color,
  Border,
  FontSize,
} from "../../GlobalStyles";
import { Image } from "expo-image";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const MyInvestment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <View>
          <Image
            style={styles.frameChild}
            source={require("../../screens/AppImage/SBIMutualFund_MF.png")}
          />
        </View>
        <Text style={styles.fundName}>SBI Small Cap Mutual Fund</Text>
      </View>

      <View style={[styles.return_row, { marginTop: screenHeight * 0.02 }]}>
        <Text style={styles.page_status}>Returns</Text>
        <View style={styles.button_row_L}>
          <Text style={styles.output}>₹ 22,512</Text>
          <Text style={styles.output_per}>+ 22.15 %</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View>
          <Text style={styles.info}>Current Value</Text>
          <Text style={styles.value}> ₹ 22,512</Text>
        </View>

        <View>
          <Text style={styles.info}>Invested Value</Text>
          <Text style={styles.value}> ₹ 20,000</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View>
          <Text style={styles.info}>Average NAV</Text>
          <Text style={styles.value}> ₹ 22,512</Text>
        </View>

        <View>
          <Text style={styles.info}>No of Unit</Text>
          <Text style={styles.value}> 38</Text>
        </View>
      </View>

      <View>
        <Text style={styles.info}>Current Nav</Text>
        <Text style={styles.value}> ₹ 25.5</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: screenHeight * 0.3,
        }}
      >
        <View style={{ color: "#fff", backgroundColor: "#fff" }}>
          <SelectOnBtn
            title="Sell"
            handelSubmit={() => navigation.navigate("PurchaseSIP", { meta })}
          />
        </View>
        <SelectOnBtn
          style={{ color: "#fff", backgroundColor: "#fff" }}
          title="Invest More"
          handelSubmit={() => navigation.navigate("SIPAmount", { meta })}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },

  info: {
    marginTop: 30,
    fontSize: 18,
    color: Color.colorSteelblue_100,
    textAlign: "left",
  },
  value: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    color: Color.colorSteelblue_100,
    textAlign: "left",
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"
  },
  return_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  page_status: {
    fontSize: FontSize.size_xl,
    color: Color.colorSteelblue_100,
    textAlign: "left",
  },

  button_row_L: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 15,
  },

  output: {
    color: Color.colorMediumseagreen_100,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    fontWeight: "700",
  },

  output_per: {
    color: Color.colorMediumseagreen_100,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    fontSize: FontSize.size_smi,
    fontWeight: "100",
  },

  fundName: {
    fontSize: FontSize.size_5xl,
    width: "85%",
    height: screenHeight * 0.1,

    fontWeight: "700",
    color: "#2E436C",
    textAlignVertical: "center",
  },

  frameChild: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default MyInvestment