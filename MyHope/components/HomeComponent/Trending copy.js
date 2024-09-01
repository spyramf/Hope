import { View, Text, Dimensions, TouchableOpacity,StyleSheet } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const Trending = (props) => {
  const navigation = useNavigation();

  const {
    firstLogo,
    secondLogo,
    thirdLogo,
    fourthLogo,
    firstLine,
    secondLine,
    thirdLine,
    fourthLine,
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
          width: width * 0.95,
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
            marginVertical: "auto",
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("MobileNo")}
          >
            <View>
              <Image style={styles.frameChild} source={firstLogo} />
            </View>
            <Text style={{ padding: 0, color: "#2E436C" }}>{ firstLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: "center" }}>
            <View>
              <Image style={styles.frameChild} source={secondLogo} />
            </View>
            <Text style={{ marginTop: 0, color: "#2E436C" }}>{secondLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: "center" }}>
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
