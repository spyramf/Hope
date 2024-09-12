import React from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import Inline from "../../components/MultiUseApp/InLine";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { Padding } from "../../GlobalStyles";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation schema for OTP input
const validationSchema = Yup.object({
  otp: Yup.string()
    .length(4, "OTP must be exactly 4 digits") // Adjusted to 4 digits
    .required("OTP is required"),
});

const EmailOtpVerify = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = React.useState(false); // State for loading indicator

  // Function to handle OTP verification
  const verifyOtp = async (values, { setSubmitting }) => {
    const { otp } = values;
    setLoading(true); // Start loading indicator
    const email = await AsyncStorage.getItem("email");

    try {
      const res = await client.post("/verify-otp", { email, otp });
      console.log("Response from OTP service:", res.data);

      if (res.data.success) {
        navigation.navigate("Set Password"); // Navigate to the next screen
      } else {
        Alert.alert(
          "Verification Failed",
          res.data.message || "Invalid OTP, please try again."
        );
      }
    } catch (error) {
      console.error("Failed to verify OTP");
      Alert.alert(
        "Error",
        "There was an issue verifying the OTP. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading indicator
      setSubmitting(false); // Allow form submission again
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ otp: "" }} // Initial empty value for OTP input
        validationSchema={validationSchema} // Apply validation
        onSubmit={verifyOtp} // Submit handler
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
                containerStyle={styles.inputContainer} // Styling for input container
                inputStyle={styles.input} // Styling for input field
              />
            </View>
            <OnBtn
              title={isSubmitting ? "Verifying..." : "Verify OTP"}
              handelSubmit={handleSubmit}
              disabled={isSubmitting || loading} // Disable button while submitting or loading
              buttonStyle={styles.button} // Styling for button
            />
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.loadingIndicator} // Styling for loading indicator
              />
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

// Styling
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
    marginBottom: 20, // Spacing between the input field and button
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

export default EmailOtpVerify;
