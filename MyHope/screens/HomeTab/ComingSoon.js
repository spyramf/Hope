import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
} from "react-native";
import { FontSize, Padding, Color, Border } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ComingSoon = () => {
    const navigation = useNavigation();
  const handleNotifyMe = () => {
    // Logic to handle user notifications or email sign-up
    
    alert("We'll notify you when this feature is available!");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../screens/AppImage/cooming_soon.png")} // Replace with your own image
        style={styles.image}
      />
      <Text style={styles.title}>Coming Soon!</Text>
      <Text style={styles.description}>
        We’re working hard to bring you this feature. Stay tuned for updates!
      </Text>
      <View style={{marginTop:20}}>
        <Button title="Notify Me" onPress={handleNotifyMe} color="#31a062" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Padding.p_3xs,
    backgroundColor: "#fff", // Light background color
  },
  image: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.6,
    marginBottom: Padding.p_3xs,
  },
  title: {
    fontSize: FontSize.size_xl,
    fontWeight: "bold",
    color: Color.colorSteelblue_100,
    marginBottom: Padding.p_xs,
  },
  description: {
    fontSize: FontSize.size_md,
    color: "#333",
    textAlign: "center",
    marginBottom: Padding.p_3xs,
    paddingHorizontal: Padding.p_2xs,
  },
});

export default ComingSoon;
