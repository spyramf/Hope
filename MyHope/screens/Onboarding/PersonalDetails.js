import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../api/client";
import { useLogin } from "../../contexts/LoginProvider";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import SIPDropdown from "../../components/Dropdown/SIPDropdown";
import { State } from "../../components/Dropdown/Dropdown data/DropdownData";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation Schema using Yup
const validationSchema = Yup.object({
  add: Yup.string()
    .trim()
    .min(3, "Address must be at least 3 characters")
    .required("Address is required"),
  pin: Yup.string().trim().min(6, "Invalid PIN").required("PIN is required"),
  city: Yup.string().trim().required("City is required"),
});

const PersonalDetails = () => {
  const navigation = useNavigation();
  const { selectedCountry, setSelectedCountry, country } = useLogin();
  const [loading, setLoading] = useState(false); // Loading state
  const [initialValues, setInitialValues] = useState({
    add: "",
    pin: "",
    city: "",
    state: "",
  });

  // Load stored values from AsyncStorage
  useEffect(() => {
    const loadStoredValues = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem("add");
        const storedPin = await AsyncStorage.getItem("pin");
        const storedCity = await AsyncStorage.getItem("city");
        const storedState = await AsyncStorage.getItem("state");

        setInitialValues({
          add: storedAddress || "",
          pin: storedPin || "",
          city: storedCity || "",
          state: storedState || "",
        });
      } catch (error) {
        console.log("Error loading stored values:", error);
        Alert.alert("Error", "Failed to load stored values.");
      }
    };

    loadStoredValues();
  }, []);

  // Handle form submission
  const signUp = async (values) => {
    setLoading(true); // Start loading
    const { add, pin, city } = values;
    const data = { state: country, add, pin, city };

    try {
      await AsyncStorage.setItem("add", add);
      await AsyncStorage.setItem("pin", pin);
      await AsyncStorage.setItem("city", city);
      await AsyncStorage.setItem("state", selectedCountry);

      const res = await client.post(
        "/personal-details",
        { data },
        {
          headers: {
            Authorization: "JWT " + (await AsyncStorage.getItem("token")),
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigation.navigate("NomineeDetails");
      } else {
        Alert.alert("Error", res.data.message || "Failed to submit details.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        "Failed to submit personal details. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
      setSelectedCountry("");
    }
    setSelectedCountry("");
  };

  return (
    <View style={styles.container}>
      {/* Loading Modal */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Submitting your details...</Text>
        </View>
      </Modal>

      <Formik
        initialValues={initialValues}
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
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              {/* State Dropdown */}
              <SIPDropdown SIPdata={State} leftHeading="Select Your State" />

              {/* Form Inputs */}
              <ScrollView style={styles.formContainer}>
                <Inline
                  leftHeading="Enter Your Address"
                  error={touched.add && errors.add}
                  onBlur={handleBlur("add")}
                  placeholder="Enter Your Address"
                  autoCapitalize="words"
                  onChangeText={handleChange("add")}
                  value={values.add}
                />

                <Inline
                  leftHeading="Enter Your PIN Code"
                  error={touched.pin && errors.pin}
                  onBlur={handleBlur("pin")}
                  placeholder="Enter Your PIN Code"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  maxLength={6}
                  onChangeText={handleChange("pin")}
                  value={values.pin}
                />

                <Inline
                  leftHeading="Enter Your City"
                  error={touched.city && errors.city}
                  onBlur={handleBlur("city")}
                  placeholder="Enter Your City"
                  autoCapitalize="words"
                  onChangeText={handleChange("city")}
                  value={values.city}
                />
              </ScrollView>
            </KeyboardAvoidingView>

            {/* Button at the bottom */}
            <OnBtn title="Verify Details" handelSubmit={handleSubmit} />
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
  },
  formContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});

export default PersonalDetails;
