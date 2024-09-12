import React from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import Inline from "../../components/MultiUseApp/InLine";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { Padding } from "../../GlobalStyles";
const validateOtp = require("../../api/validateOtp");

// Validation schema for OTP input
const validationSchema = Yup.object({
  otp: Yup.string()
    .length(4, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

const OtpVerify = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { verificationId, mobileNumber } = route.params.data;

  // Function to handle OTP submission
  const signUp = async (values, { setSubmitting }) => {
    try {
      const { otp } = values;
      const otpResponse = await validateOtp({
        verificationId,
        code: otp,
        mobileNumber,
      });

      // Check the OTP validation response
      if (otpResponse.data) {
        // Navigate to the next screen upon successful OTP verification
        navigation.navigate("EmailAddress");
      } else {
        // Display an error alert if OTP validation fails
        Alert.alert(
          "Invalid OTP",
          "The OTP entered is incorrect. Please try again."
        );
      }
    } catch (error) {
      // Catch and display errors
      console.error("Failed to verify OTP");
      Alert.alert("Error", "The OTP entered is incorrect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ otp: "" }}
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
          isSubmitting,
        }) => (
          <>
            <View style={styles.formContainer}>
              <Inline
                leftHeading="Enter Your OTP"
                error={touched.otp && errors.otp}
                onBlur={handleBlur("otp")}
                placeholder="Enter Your OTP"
                autoCapitalize="none"
                onChangeText={handleChange("otp")}
                keyboardType="numeric"
                maxLength={4} // Limit OTP to 4 digits
                value={values.otp}
                containerStyle={styles.inputContainer} // Added for styling
                inputStyle={styles.input} // Added for styling
              />
            </View>
            <OnBtn
              title={isSubmitting ? "Verifying..." : "OTP Verification"}
              handelSubmit={handleSubmit}
              disabled={isSubmitting} // Disable button while submitting
              buttonStyle={styles.button} // Added for styling
            />
            {isSubmitting && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.loadingIndicator} // Added for styling
              />
            )}
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
  formContainer: {
    flex: 1,

  },
  inputContainer: {
    marginBottom: 20, // Add spacing between the input field and button
  },
  input: {
    borderWidth: 1,
    borderColor: "#2e436c",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#31a062",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default OtpVerify;
