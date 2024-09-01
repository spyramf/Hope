import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Pressable, graphStyle, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { Dimensions } from "react-native";
import Slider from '@react-native-community/slider';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;





const FundPageNew = ({ route }) => {
  const navigation = useNavigation();


  const meta = route.params.data;

console.log(meta)

  const [range, setRange] = useState([0, 100]);

  const handleRangeChange = (values) => {
    setRange(values);
  };

  ////////////////////////////////////////////////////////////////////////Line Chart ////////////////////////////////////////////////////////////////////////////////////////////

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 1,
    useShadowColorFromDataset: false,
    barRadius: 30,
    propsForLabels: {
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: "bold",
    },
    propsForVerticalLabels: {
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "normal",
    },
    propsForHorizontalLabels: {
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "normal",
    },
  };

  ////////////////////////////////////////////////////////////////////////Line Chart ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////Redio Button ////////////////////////////////////////////////////////////////////////////////////////////

  const [selectedRadio, setSetectedRadio] = useState(1);

  const skills = [
    {
      id: 1,
      name: <Text style={styles.note_text}> Invest Monthly (SIP) </Text>,
    },

    {
      id: 2,
      name: <Text style={styles.note_text}> Invest On Time </Text>,
    },
  ];

  ////////////////////////////////////////////////////////////////////////Redio Button ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////Redio Button ////////////////////////////////////////////////////////////////////////////////////////////

  const data1 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    legend: ["L1", "L2"],
    data: [
      [60, 60],
      [30, 30],
      [30, 30],
      [30, 30],
      [30, 30],
      [30, 30],
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
  };

  ////////////////////////////////////////////////////////////////////////Redio Button ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.buttonrow}>
          <View>
            <Image style={styles.frameChild} source={{ uri: meta.Logo }} />
          </View>

          <Text style={[styles.fundName]}>{meta.SchemeName}</Text>
        </View>

        <View
          style={[styles.buttonrow_1, { marginBottom: screenHeight * 0.0 }]}
        >
          <Pressable style={[styles.invest_button_margin]}>
            <Text style={[styles.invest_button]}>Equity</Text>
          </Pressable>

          <Pressable>
            <Text style={[styles.invest_button]}>Large Cap</Text>
          </Pressable>
        </View>

        <View style={[styles.return_row, { marginTop: screenHeight * 0.02 }]}>
          <Text style={[styles.page_status]}>Returns</Text>
          <View style={styles.button_row_L}>
            <Text style={[styles.output]}>₹ 22,512</Text>
            <Text style={[styles.output_per]}>+ 22.15 %</Text>
          </View>
        </View>

        <LineChart
          data={data}
          width={screenWidth}
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            margin: 5,
          }}
        >
          <Pressable style={styles.year_button}>
            <Text style={[styles.year_text]}>3M</Text>
          </Pressable>

          <Pressable style={[styles.year_button]}>
            <Text style={[styles.year_text]}>6M</Text>
          </Pressable>

          <Pressable style={[styles.year_button]}>
            <Text style={[styles.year_text]}>1Y</Text>
          </Pressable>

          <Pressable style={[styles.year_button]}>
            <Text style={[styles.year_text]}>3Y</Text>
          </Pressable>

          <Pressable style={[styles.year_button]}>
            <Text style={[styles.year_text]}>5Y</Text>
          </Pressable>

          <Pressable style={[styles.year_button]}>
            <Text style={[styles.year_text]}>Max</Text>
          </Pressable>
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            borderStyle: "dashed",
          }}
        />

        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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

                {/* <View>
              {
                selectedRadio === item.id ? <Upi_pay />
                  : null
              }
            </View> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            borderStyle: "dashed",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <Text style={[styles.year_text]}>Monthly Investment</Text>
          <Pressable style={[styles.year_button]}>
            <Text style={[styles.year_text]}>₹ 50000 </Text>
          </Pressable>
        </View>

        <View
          style={[styles.colsFlexBox, { marginBottom: 20 }, { marginTop: 20 }]}
        >
          <Slider
            style={{ width: "105%", height: 40, marginTop: 10 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#31A062"
            maximumTrackTintColor="#000000"
            height={100}
          />
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.6,
            borderStyle: "dashed",
          }}
        />

        <StackedBarChart
          style={graphStyle}
          data={data1}
          width={screenWidth}
          yAxisSuffix="k"
          yAxisLabel="returns"
          height={220}
          chartConfig={chartConfig}
          barRadius={30}
          marginTop={20}
        />

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            borderStyle: "dashed",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
          }}
        >
          <View style={styles.button_row_L}>
            <Text style={[styles.page_head]}>Current Value</Text>
            <Text style={[styles.pageTypo]}>₹ 22,512</Text>
          </View>

          <View style={styles.button_row_L}>
            <Text style={[styles.page_head]}>Investment</Text>
            <Text style={[styles.pageTypo]}>₹ 20,000</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            borderStyle: "dashed",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: screenHeight * 0.03,
          }}
        >
          <SelectOnBtn
            title="One Time"
            handelSubmit={() => navigation.navigate("PurchaseSIP", { meta })}
          />

          <SelectOnBtn
            title=" Create SIP"
            handelSubmit={() => navigation.navigate("SIPAmount", { meta })}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: Padding.p_3xs,
 
  },

  frameChild: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },

  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button3: {
  
    backgroundColor: Color.colorMediumseagreen_100,
    borderRadius: Border.br_xl,
    paddingVertical: screenHeight * 0.025,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffff",
    textAlign: "center",
    padding: screenHeight * 0.001,
    fontSize: 22,
    fontWeight: "700",
    width: screenWidth * 0.43,
  },

  button2: {
  
    backgroundColor: "#828282",
    borderRadius: Border.br_xl,
    paddingVertical: screenHeight * 0.025,
    alignItems: "center",
    justifyContent: "center",
    color: "#2E436C",
    textAlign: "center",
    padding: screenHeight * 0.001,
    fontSize: 22,
    fontWeight: "700",
    width: screenWidth * 0.43,
  },

  fundName: {
    fontSize: FontSize.size_5xl,
    width: "85%",
    height: screenHeight * 0.1,

    fontWeight: "700",
    color: "#2E436C",
    textAlignVertical: "center",
  },

  buttonrow_1: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  invest_button_margin: {
    marginRight: screenHeight * 0.03,
    marginLeft: screenHeight * 0.02,
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
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
    fontSize: 10,
  },

  button_row_L: {
    flexDirection: "column",
    alignItems: "flex-start",
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

  year_text: {
    color: Color.colorSteelblue_100,
    fontSize: 15,
    textAlign: "center",
  },

  year_button: {
    marginLeft: 23,
    borderColor: Color.colorWhite,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_8xs,
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "center",
    paddingHorizontal: Padding.p_4xs,
    paddingVertical: Padding.p_9xs,
    flexDirection: "row",
    alignItems: "center",
  },

  colsFlexBox: {
    paddingHorizontal: Padding.p_7xs,
    height: 23,
    marginTop: 27,
    paddingVertical: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  box: {
    flexDirection: "column",
  },

  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  radio: {
    height: screenWidth * 0.05,
    width: screenWidth * 0.05,
    borderColor: "#2E436C",
    borderWidth: 2,
    borderRadius: screenWidth * 0.025,

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

  frameItem: {
    width: "98%",
    height: 2,
    opacity: 0.5,
    marginTop: "1%",
  },

  button_row_v: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: screenHeight * 0.05,
  },
});

export default FundPageNew;
