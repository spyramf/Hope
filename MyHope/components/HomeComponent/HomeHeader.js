import { View, Text, Dimensions, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const HomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <StatusBar />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              top: 5,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 35,
                  backgroundColor: "#fff",
                  borderWidth: 0.5,
                  top: 0,
                  left: -20,
                }}
              >
                <View style={{ margin: "auto" }}>
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={50}
                    color="#2E436C"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View>
              <Text
                style={{
                  color: "#2E436C",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Pradeep Gangurde
              </Text>
              <Text
                style={{
                  color: "#2E436C",
                  fontSize: 12,
                }}
              >
                Nashik
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <View style={{ top: 25 }}>
          <Ionicons name="notifications-outline" size={24} color="#2E436C" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E7E7E7",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: "auto",
    height: height * 0.09,
    backgroundColor: "#fff",
  },
});

export default HomeHeader;
