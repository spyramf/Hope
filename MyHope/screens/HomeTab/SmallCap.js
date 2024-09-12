import React from "react";
import { View, StyleSheet } from "react-native";
import FundTypeFilter from "../../components/MultiUseApp/FundTypeFilter";
import { useNavigation } from "@react-navigation/native";
const SmallCap = () => {
  // Define any additional filter conditions if needed
  const dailyFilterCondition = (item) => item.Daily === "Y";

  return (
    <View style={styles.container}>
      <FundTypeFilter filterCondition={dailyFilterCondition} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default SmallCap;
