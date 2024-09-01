import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import MainHeader from "../../components/MultiUseApp/MainHeader";
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");

const PoliticallyExposed = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <MainHeader header=" Your Occupation" back="MobileNo" /> */}

      <View>
        <Text style={styles.SubPageTitle}>
          Are you a politically exposed person or a relative of a politically
          exposed person ?
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SelectOnBtn
          title="Yes"
          handelSubmit={() => navigation.navigate("LinkBankAccount")}
        />
        <SelectOnBtn
          title="No"
          handelSubmit={() => navigation.navigate("LinkBankAccount")}
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
    textAlign: "center",
    padding:10,
    bottom:20
  },
});
export default PoliticallyExposed;
