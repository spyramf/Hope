import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const ListButton = props => {
  const navigation = useNavigation();

  const { title, handelSubmit } = props;

  return (
    <View>
      <TouchableOpacity onPress={handelSubmit}>
        <View style={styles.button}>
          <View style={styles.dataInRow}>
            <AntDesign
              name="profile"
              size={24}
              color="#2E436C"
              marginEnd={10}
            />
            <Text style={[styles.inputText]}> {title} </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 5,
    height: 70,
    padding: 20,
  },

  inputText: {
    fontSize: 17,
    textAlignVertical: "center",
    color: "#2E436C",
    fontWeight: "600",
  },

  dataInRow: {
    padding: 2,
    flexDirection: "row",
  },
});

export default ListButton;
