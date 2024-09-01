import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import MainHeader from "../../components/MultiUseApp/MainHeader";
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");

const Occupation = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <MainHeader header=" Your Occupation" back="MobileNo" /> */}

      <View>
        <Text style={styles.SubPageTitle}>Select one of the option</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn
          title="Business"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
        />
        <SelectOnBtn
          title="Private Sector"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn
          title="Farmer"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
        />
        <SelectOnBtn
          title="Gov Sector"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn
          title="Public Sector"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
        />
        <SelectOnBtn
          title="Retired"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn
          title="Student"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
        />
        <SelectOnBtn
          title="Other"
          handelSubmit={() => navigation.navigate("NomineeDetails")}
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
});
export default Occupation;
