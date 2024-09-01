import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: screenHeight } = Dimensions.get("window");

const TaxStatus = (props) => {
  const navigation = useNavigation();

  console.log(props.route.params.gen)

  const gender = props.route.params.gen

  console.log(gender)
  const Individual = async () => {

    const gen = { taxStatus: '01', gender }
    await AsyncStorage.setItem("taxStatus", "01");
    props.navigation.navigate("AnnualIncome", { gen })
  }

  const Proprietorship = async () => {

    const gen = { taxStatus: '13', gender }
    await AsyncStorage.setItem("taxStatus", "13");
    props.navigation.navigate("AnnualIncome", { gen })
  }


  const Partnership = async () => {

    const gen = { taxStatus: '06', gender }
    await AsyncStorage.setItem("taxStatus", "06");
    props.navigation.navigate("AnnualIncome", { gen })
  }

  const Company = async () => {

    const gen = { taxStatus: '04', gender }
    await AsyncStorage.setItem("taxStatus", "04");
    props.navigation.navigate("AnnualIncome", { gen })
  }

  const HUF = async () => {

    const gen = { taxStatus: '03', gender }
    await AsyncStorage.setItem("taxStatus", "03");
    props.navigation.navigate("AnnualIncome", { gen })
  }


  const Others = async () => {

    const gen = { taxStatus: '10', gender }
    await AsyncStorage.setItem("taxStatus", "10");
    props.navigation.navigate("AnnualIncome", { gen })
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.SubPageTitle}>Select one of the option</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn title="Individual" handelSubmit={Individual} />
        <SelectOnBtn title="Proprietorship" handelSubmit={Proprietorship} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn title="Partnership" handelSubmit={Partnership} />
        <SelectOnBtn title="Company" handelSubmit={Company} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn title="HUF" handelSubmit={HUF} />
        <SelectOnBtn title="Others" handelSubmit={Others} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 32,
  },
  
  SubPageTitle: {
    fontSize: 16,
    color: "#2e436c",
    fontWeight: "500",
    lineHeight: screenHeight * 0.03,
    marginTop: screenHeight * 0.03,
    marginBottom: screenHeight * 0.01,
  },
});




export default TaxStatus;


