import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: screenHeight } = Dimensions.get("window");

const Gender = (props) => {
  const navigation = useNavigation();

  const Male = async () => {
    const gen = "M";
    await AsyncStorage.setItem("gender", "M");
    props.navigation.navigate("TaxStatus", { gen });
  };

  const Female = async () => {
    const gen = "F";
    await AsyncStorage.setItem("gender", "F");
    props.navigation.navigate("TaxStatus", { gen });
  };

  const Other = async () => {
    const gen = "O";
  await AsyncStorage.setItem("gender", "O");
    props.navigation.navigate("TaxStatus", { gen });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.SubPageTitle}>Select one of the option</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn title="Male" handelSubmit={Male} />
        <SelectOnBtn title="Female" handelSubmit={Female} />
      </View>
      <SelectOnBtn title="Other" handelSubmit={Other} />
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

export default Gender;
