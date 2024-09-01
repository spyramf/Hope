import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Padding, Color, Border } from "../../GlobalStyles";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { RecommendedFundData } from "./RecommendedFundData";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const { width } = Dimensions.get("window");
const RecommendedFund = (props) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { fundName, fundSubType, fundType, oneYear, data, logo } = props;



  console.log(currentIndex)
  const renderItem = (data) => (
    <View key={data.fundName} style={styles.cardContainer}>
      <Pressable
        onPress={() => navigation.navigate("SIPAmount")}
      >
        <View style={styles.box_size}>
          <View>
            <View>
              <View style={styles.buttonrow}>
                <View>
                  <Image
                    style={styles.frameChild}
                    source={{ uri: data.logo }}
                  />
                </View>

                <Text style={[styles.fundNameFF]}>{data.fundName}</Text>
              </View>

              <View style={{ flexDirection: "row", margin: 5 }}>
                <Pressable style={[styles.invest_button_margin]}>
                  <Text style={[styles.invest_button]}>{data.fundType}</Text>
                </Pressable>

                <Pressable>
                  <Text style={[styles.invest_button]}>{data.fundSubType}</Text>
                </Pressable>
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
                <Text style={[styles.return_text]}>1 yr Return</Text>
              </View>
              <View>
                <Text style={[styles.return_per]}>{data.oneYear}</Text>
              </View>
            </View>

            <View style={styles.year_return}>
              <View>
                <Text style={[styles.return_text]}>3 yr Return</Text>
              </View>
              <View>
                <Text style={[styles.return_per]}>40.35 %</Text>
              </View>
            </View>

            <View style={styles.year_return}>
              <View>
                <Text style={[styles.return_text]}>5 yr Return</Text>
              </View>
              <View>
                <Text style={[styles.return_per]}>40.35 %</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        renderItem={renderItem}
        index={currentIndex}
        onChangeIndex={setCurrentIndex}
        data={RecommendedFundData}
        autoplayInterval={5000}
        loop
        autoplay
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width:"100%"
  },

  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },

  cardWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },

  card: {
    width: width * 0.98,
    height: width * 0.4,
  },

  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },

  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },

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
    borderWidth: 0,
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
    width: "85.5%",

    color: "#2E436C",
    textAlignVertical: "center",
  },

  row_return: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },



  box_size: {
    borderWidth: 0,
    borderColor: Color.colorSteelblue_100,
    width:"100%",
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

  
});
export default RecommendedFund;
