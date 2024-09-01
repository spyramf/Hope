import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const MainHeader = (props) => {
const navigation = useNavigation();

  const { header, back, fundType, oneYear, data, logo } = props;
  return (
    <View style={{ marginTop: 40,marginBottom:40 }}>
      <TouchableOpacity onPress={() => navigation.navigate(back)}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={34}
          color="#2E436C"
        />
      </TouchableOpacity>
      <Text style={styles.header}>{header}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontWeight: "700",
    marginLeft: 60,
    fontSize: 30,
    color: "#2E436C",
  },
});
export default MainHeader