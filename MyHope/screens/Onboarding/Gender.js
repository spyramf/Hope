import React from "react";
import { StyleSheet, View, Text, Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: screenHeight } = Dimensions.get("window");

const Gender = (props) => {
  const navigation = useNavigation();

  const handleGenderSelection = async (gender) => {
    try {
      await AsyncStorage.setItem("gender", gender);
      navigation.navigate("TaxStatus");
    } catch (error) {
      console.error("Failed to save gender:", error);
      Alert.alert(
        "Error",
        "Failed to save gender selection. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.SubPageTitle}>Select one of the options</Text>

      <View style={styles.genderContainer}>
        <SelectOnBtn
          title="Male"
          handelSubmit={() => handleGenderSelection("M")}
        />
        <SelectOnBtn
          title="Female"
          handelSubmit={() => handleGenderSelection("F")}
        />
      </View>
      <SelectOnBtn
        title="Other"
        handelSubmit={() => handleGenderSelection("O")}
      />
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
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default Gender;
