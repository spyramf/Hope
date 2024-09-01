import { View, Text, Dimensions, TouchableOpacity,StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FatComponent from "../BSEComponent/FatComponent";



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const Trending = (props) => {
  const navigation = useNavigation();

  const {
    fourthLogo,
    fourthLine,
    thirdLine,
    thirdLogo,
    secondLine,
    secondLogo,
    firstLogo,
    firstLine,
  } = props;

  
  return (
    <View
      style={{
        justifyContent: "space-around",
        alignItems: "center",
        margin: 5,
      }}
    >
      <View
        style={{
          height: height * 0.15,
          backgroundColor: "#fff",
          borderRadius: 20,
          width: width * 0.98,
        }}
      >
        <Text
          style={{
            padding: 10,
            color: "#2E436C",
            fontWeight: "400",
            fontSize: 16,
            color: "#2E436C",
          }}
        >
          Trending
        </Text>

        <View
          style={{
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("FindFunds")}
          >
            <View>
              <Image style={styles.frameChild} source={firstLogo} />
            </View>
            <Text style={{ padding: 0, color: "#2E436C" }}>{firstLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("FindFunds")}
          >
            <View>
              <Image style={styles.frameChild} source={secondLogo} />
            </View>
            <Text style={{ marginTop: 0, color: "#2E436C" }}>{secondLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("FindFunds")}
          >
            <View>
              <Image style={styles.frameChild} source={thirdLogo} />
            </View>
            <Text style={{ marginTop: 0, color: "#2E436C" }}>{thirdLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("FindFunds")}
          >
            <View>
              <Image style={styles.frameChild} source={fourthLogo} />
            </View>

            <Text style={{ marginTop: 0, color: "#2E436C" }}>{fourthLine}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  frameChild: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
  },



});


export default Trending;
