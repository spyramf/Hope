import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import MainHeader from "../../components/MultiUseApp/MainHeader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../../api/client";
const { height: screenHeight } = Dimensions.get("window");

const Occupation = () => {
  const navigation = useNavigation();

  const handleTaxStatusSelection = async (occupation) => {
    try {
      await AsyncStorage.setItem("occupation", occupation);

    const userValues = {
      occupation,
      gender: await AsyncStorage.getItem("gender"),
      taxStatus: await AsyncStorage.getItem("taxStatus"),
    };

    console.log(userValues);
      const res = await client.post("/annual-income", userValues, {
        headers: {
          Authorization: "JWT " + (await AsyncStorage.getItem("token")),
          "Content-Type": "application/json",
        },

        data: userValues,
      });

      navigation.navigate("PersonalDetails");
    } catch (error) {
      console.error("Error storing tax status:", error);
      Alert.alert("Error", "Failed to select tax status. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.SubPageTitle}>Select one of the options</Text>

      <View style={styles.row}>
        <SelectOnBtn
          title="Business"
          handelSubmit={() => handleTaxStatusSelection("01")}
        />
        <SelectOnBtn
          title="Professional"
          handelSubmit={() => handleTaxStatusSelection("02")}
        />
      </View>

      <View style={styles.row}>
        <SelectOnBtn
          title="Agriculture"
          handelSubmit={() => handleTaxStatusSelection("04")}
        />
        <SelectOnBtn
          title="Services"
          handelSubmit={() => handleTaxStatusSelection("04")}
        />
      </View>

      <View style={styles.row}>
        <SelectOnBtn
          title="Housewife"
          handelSubmit={() => handleTaxStatusSelection("03")}
        />
        <SelectOnBtn
          title="Student"
          handelSubmit={() => handleTaxStatusSelection("10")}
        />
      </View>

      <View style={styles.row}>
        <SelectOnBtn
          title="Retired"
          handelSubmit={() => handleTaxStatusSelection("03")}
        />
        <SelectOnBtn
          title="Others"
          handelSubmit={() => handleTaxStatusSelection("10")}
        />
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default Occupation;
