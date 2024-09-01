import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from 'react'
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { useNavigation } from "@react-navigation/native";

const { height: height } = Dimensions.get("window");
const { width: width } = Dimensions.get("window");



const OrderCompleted = () => {
     const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Image
          source={require("../../screens/AppImage/Completing.png")}
          style={{
            alignItem: "center",
            width: width * 1,
            height: height * 0.7,
          }}
        />
      </View>

      <OnBtn
        title="Order Completed"
        handelSubmit={navigation.navigate("Home")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 10,
  },
});
export default OrderCompleted