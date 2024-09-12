import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import * as Yup from "yup";
import { Formik } from "formik";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { Padding } from "../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
const sendCentralRequest = require("../../api/messageCentralOTP");

// Validation schema for the mobile input field
const validationSchema = Yup.object({
  mobile: Yup.string()
    .length(10, "Incorrect Mobile Number")
    .required("Mobile Number is Required"),
});

const MobileNo = (props) => {
  const navigation = useNavigation();
  const [initialMobile, setInitialMobile] = useState(null); // Set to null initially
  const [loading, setLoading] = useState(true); // Handle loading state

  useEffect(() => {
    const loadMobile = async () => {
      try {
        const savedMobile = await AsyncStorage.getItem("mobile");
        setInitialMobile(savedMobile || ""); // Set initialMobile state with saved mobile number or empty string
      } catch (error) {
        console.log("Failed to load mobile number:", error);
        Alert.alert("Error", "Failed to load mobile number.");
      } finally {
        setLoading(false); // Set loading to false once the operation completes
      }
    };
    loadMobile();
  }, []);

  const signUp = async (values) => {
    const { mobile } = values;
    const phoneNumber = mobile;
    try {
      await AsyncStorage.setItem("mobile", mobile);
      const otpResponse = await sendCentralRequest(phoneNumber);
      navigation.navigate("OTP Verification", otpResponse);
      console.log("Response from OTP service:", otpResponse);
    } catch (error) {
      console.error("Failed to request OTP:", error);
      Alert.alert("Error", "Failed to request OTP. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ mobile: initialMobile }}
        enableReinitialize={true} // Ensures that the form is reinitialized when initialValues change
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <ScrollView>
              <View style={styles.inputContainer}>
                <Inline
                  leftHeading="Enter Mobile Number"
                  error={touched.mobile && errors.mobile}
                  onBlur={handleBlur("mobile")}
                  placeholder="Enter Mobile Number"
                  autoCapitalize="none"
                  onChangeText={handleChange("mobile")}
                  keyboardType="numeric"
                  maxLength={10}
                  value={values.mobile}
                />
              </View>
            </ScrollView>
            <OnBtn title="Verify Mobile" handelSubmit={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Padding.p_3xs,
    paddingTop: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 20, // Add spacing between the input field and button
  },
});

export default MobileNo;
