import React from "react";
import { StyleSheet, View, Text, Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: screenHeight } = Dimensions.get("window");

const TaxStatus = (props) => {
  const navigation = useNavigation();

  const handleTaxStatusSelection = async (taxStatus) => {
    try {

      await AsyncStorage.setItem("taxStatus", taxStatus);
      navigation.navigate("Occupation");
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
          title="Individual"
          handelSubmit={() => handleTaxStatusSelection("01")}
        />
        <SelectOnBtn
          title="Proprietorship"
          handelSubmit={() => handleTaxStatusSelection("13")}
        />
      </View>

      <View style={styles.row}>
        <SelectOnBtn
          title="Partnership"
          handelSubmit={() => handleTaxStatusSelection("06")}
        />
        <SelectOnBtn
          title="Company"
          handelSubmit={() => handleTaxStatusSelection("04")}
        />
      </View>

      <View style={styles.row}>
        <SelectOnBtn
          title="HUF"
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

export default TaxStatus;
