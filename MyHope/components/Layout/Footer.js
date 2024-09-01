import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const Footer = () => {
  const route = useRoute();
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign
          style={[styles.icon, route.name === "Home" && styles.active]}
          name="home"
        />
        <Text style={[styles.iconText, route.name === "Home" && styles.active]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Investment")}
      >
        <AntDesign
          style={[styles.icon, route.name === "Investment" && styles.active]}
          name="plussquareo"
        />
        <Text
          style={[
            styles.iconText,
            route.name === "Investment" && styles.active,
          ]}
        >
          Investment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Order")}
      >
        <AntDesign
          style={[styles.icon, route.name === "Order" && styles.active]}
          name="retweet"
        />
        <Text
          style={[styles.iconText, route.name === "Order" && styles.active]}
        >
          Order
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Account")}
      >
        <MaterialCommunityIcons
          style={[styles.icon, route.name === "Account" && styles.active]}
          name="account-circle-outline"
        />
        <Text
          style={[styles.iconText, route.name === "Account" && styles.active]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: "auto",
    height: 70,
    backgroundColor: "#ffff",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 35,
    color: "#2E436C",
  },
  iconText: {
    color: "#2E436C",
    fontSize: 10,
  },
  active: {
    color: "#31a062",
  },
});
export default Footer;
