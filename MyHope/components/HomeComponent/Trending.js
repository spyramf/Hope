import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

const Trending = (props) => {
  const {
    firstLogo,
    firstLine,
    firstHandelSubmit,
    secondLogo,
    secondLine,
    secondHandelSubmit,
    thirdLogo,
    thirdLine,
    thirdHandelSubmit,
    fourthLogo,
    fourthLine,
    fourthHandelSubmit,
  } = props;

  const renderImage = (source) => {
    return <Image style={styles.frameChild} source={source} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Trending</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={firstHandelSubmit} // Corrected handlers
          >
            {renderImage(firstLogo)}
            <Text style={styles.text}>{firstLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={secondHandelSubmit}
          >
            {renderImage(secondLogo)}
            <Text style={styles.text}>{secondLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={thirdHandelSubmit}
          >
            {renderImage(thirdLogo)}
            <Text style={styles.text}>{thirdLine}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={fourthHandelSubmit}
          >
            {renderImage(fourthLogo)}
            <Text style={styles.text}>{fourthLine}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 5,
  },
  card: {
    height: height * 0.15,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: width * 0.98,
    padding: 10,

  },
  title: {
    color: "#2E436C",
    fontWeight: "400",
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  iconWrapper: {
    alignItems: "center",
  },
  frameChild: {
    width: width * 0.12,
    height: width * 0.12,
  },
  text: {
    color: "#2E436C",
    marginTop: 5,
  },
});

export default Trending;
