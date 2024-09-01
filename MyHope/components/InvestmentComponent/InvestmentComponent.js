import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, Dimensions, TextInput, rangeValues, graphStyle, chartConfig, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Padding, Color, Border, FontFamily, } from "../../GlobalStyles";
import { } from "react-native-svg"




const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;








const InvestmentComponent = (props) => {
  const navigation = useNavigation();

  const { fundName, fundSubType, fundType, oneYear, data, logo } = props;

  const handelSubmit = () => {
    navigation.navigate("MyInvestment", { data });
  };

  return (
    <View style={styles.findFunds}>
      <View style={styles.frameParentFlexBox}>
        <View style={styles.frame}></View>
        <View style={styles.frameContainer}>
          <TouchableOpacity
            style={[styles.box_button, { marginTop: "1%" }]}
            onPress={handelSubmit}
          >
            <View style={styles.box_size}>
              <View>
                <View>
                  <View style={styles.buttonrow}>
                    <View>
                      <Image
                        style={styles.frameChild}
                        source={require("../../screens/AppImage/SBIMutualFund_MF.png")}
                      />
                    </View>

                    <Text style={[styles.fundNameFF]}>{fundName}</Text>
                  </View>
                </View>
              </View>

              <View>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 0.5,
                    borderStyle: "dashed",
                  }}
                />
              </View>

              <View style={[styles.row_return]}>
                <View style={styles.year_return}>
                  <View>
                    <Text style={[styles.return_text]}>Market Value</Text>
                  </View>
                  <View>
                    <Text style={[styles.return_per]}>22,512</Text>
                  </View>
                </View>

                <View style={styles.year_return}>
                  <View>
                    <Text style={[styles.return_text]}>Investment</Text>
                  </View>
                  <View>
                    <Text style={[styles.return_per]}>20,000</Text>
                  </View>
                </View>

                <View style={styles.year_return}>
                  <View>
                    <Text style={[styles.return_text]}>Returns</Text>
                  </View>
                  <View>
                    <Text style={[styles.return_per]}>40.35 %</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonrow_1: {
    flexDirection: "row",
  },

  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invest_button_margin: {
    marginRight: screenHeight * 0.03,
    marginLeft: screenHeight * 0.02,
  },

  frameChild: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
  },

  invest_button: {
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 1,
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: Padding.p_8xs,
    width: "100%",
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_8xs,
    alignItems: "center",
    fontSize: 10,
  },

  return_text: {
    color: Color.colorSteelblue_100,
    width: "100%",
    fontSize: FontSize.size_smi,

    textAlign: "center",
  },

  return_per: {
   
    color: Color.colorMediumseagreen_100,
    fontWeight: "700",
  },

  year_return: {
    alignItems: "center",
  },

  fundNameFF: {
    fontSize: FontSize.size_lg,
    width: "85%",
    height: screenHeight * 0.1,

    color: "#2E436C",
    textAlignVertical: "center",
  },

  row_return: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    margin:5,
  },

  box_button: {
    margin: "1%",
  },

  box_size: {
    borderWidth: 0,
    borderColor: Color.colorSteelblue_100,
    width: screenWidth * 0.95,
    borderRadius: 20,
    paddingVertical: Padding.p_10xs,
    backgroundColor: Color.colorWhite,
    paddingHorizontal: Padding.p_11xs,
  },

  frameItem: {
    width: "100%",
    alignItems: "center",
    marginTop: "1%",
    height: 1,
    opacity: 0.4,
    justifyContent: "center",
  },

  frameContainer: {
    alignItems: "center",
  },

  findFunds: {
  
    overflow: "hidden",
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_6xs,
    width: "100%",

  },
});

export default InvestmentComponent;
