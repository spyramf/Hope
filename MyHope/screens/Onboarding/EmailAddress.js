import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import * as Yup from "yup";
import { Formik } from "formik";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../../api/client";

// Validation schema for the email input field
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email Address is required"),
});

const EmailAddress = () => {
  const navigation = useNavigation();
  const [initialEmail, setInitialEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Load the email from AsyncStorage on component mount
  useEffect(() => {
    const loadEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        setInitialEmail(savedEmail || ""); // Use empty string if no email is found
      } catch (error) {
        console.error("Failed to load email:", error);
        Alert.alert("Error", "Failed to load saved email. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadEmail();
  }, []);

  // Handle form submission for the email field
  const signUp = async (values) => {
    const { email } = values;
    console.log("Submitting email:", email);

    try {
      // Save email to AsyncStorage
      await AsyncStorage.setItem("email", email);

      // Send a POST request to request OTP
      const res = await client.post("/request-otp", { email });
      console.log("Response from OTP service:", res.data);

      if (res.data.success) {
        // Navigate to the OTP verification screen if successful
        navigation.navigate("Email OTP Verification", { email });
      } else {
        // Display an error message if the response is unsuccessful
        Alert.alert(
          "Error",
          res.data.message || "Unauthorized access. Please try again."
        );
      }
    } catch (error) {
      console.error("Failed to process email:", error);
    
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#31a062" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: initialEmail }}
        enableReinitialize={true}
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Inline
                leftHeading="Enter Email Address"
                error={touched.email && errors.email}
                onBlur={handleBlur("email")}
                placeholder="Enter Your Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                value={values.email}
              />
            </ScrollView>
            <OnBtn
              title="Verify Email"
              handelSubmit={handleSubmit}
              // Optional: Add disabled state based on form submission status
            />
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
    padding: 16,
    paddingTop: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#2e436c",
  },
  scrollContainer: {
    flexGrow: 1,

  },
});

export default EmailAddress;
