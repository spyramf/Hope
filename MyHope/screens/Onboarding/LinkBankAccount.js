import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  FontFamily,
  FontSize,
  Color,
  Padding,
  Border,
} from "../../GlobalStyles";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const LinkBankAccount = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleUPILink = () => {
    try {
      setIsLoading(true);
      // Simulate UPI link success/failure
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Success", "Bank Account Linked Successfully via UPI");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Failed to link bank account via UPI.");
    }
  };

  const handleManualLink = () => {
    navigation.navigate("BankDetails");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleUPILink}
          disabled={isLoading}
        >
          <View style={styles.buttonRow}>
            <Image
              style={styles.icon}
              source={require("../../screens/AppImage/AutoPay/upi.png")}
            />
            <Text style={styles.textStyle}>Link Bank Account Using UPI</Text>
            <AntDesign name="right" size={32} color="#2E436C" />
          </View>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <TouchableOpacity style={styles.button} onPress={handleManualLink}>
          <View style={styles.buttonRow}>
            <Image
              style={styles.icon}
              source={require("../../screens/AppImage/AutoPay/balance.png")}
            />
            <Text style={styles.textStyle}>Link Bank Account Manually</Text>
            <AntDesign name="right" size={32} color="#2E436C" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: Padding.p_3xs,
    justifyContent: "center",
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2E436C",
  },
  orText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E436C",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#E7E7E7",
    borderRadius: Border.br_xl,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  icon: {
    width: screenWidth * 0.07,
    height: screenWidth * 0.06,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default LinkBankAccount;
