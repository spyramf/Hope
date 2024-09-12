import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../api/client";
import { useLogin } from "../../contexts/LoginProvider";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import SIPDropdown from "../../components/Dropdown/SIPDropdown";
import { Nominee } from "../../components/Dropdown/Dropdown data/DropdownData";
import DatePicker from "../../components/MultiUseApp/DatePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation Schema using Yup
const validationSchema = Yup.object({
  n_name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Nominee Name is required"),
  n_pan: Yup.string()
    .trim()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .nullable(),
});

const NomineeDetails = () => {
  const { selectedCountry, setSelectedCountry, datePick, setDatePick } =
    useLogin();
  const navigation = useNavigation();
  const [initialValues, setInitialValues] = useState({
    n_name: "",
    n_dob: "",
    n_pan: "",
    n_relation: selectedCountry,
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Loading stored values from AsyncStorage
  useEffect(() => {
    const loadStoredValues = async () => {
      try {
        const storedName = await AsyncStorage.getItem("n_name");
        const storedDob = await AsyncStorage.getItem("n_dob");
        const storedPan = await AsyncStorage.getItem("n_pan");
        const storedRelation = await AsyncStorage.getItem("n_relation");

        setInitialValues({
          n_name: storedName || "",
          n_dob: storedDob || "",
          n_pan: storedPan || "",
          n_relation: storedRelation || selectedCountry,
        });

        setDatePick(storedDob || "");
      } catch (error) {
        console.error("Error loading stored values from AsyncStorage:", error);
        Alert.alert(
          "Error",
          "Failed to load nominee details. Please try again."
        );
      }
    };

    loadStoredValues();
  }, [selectedCountry]);

  // Submitting form data
  const handleSubmitForm = async (values) => {
    const { n_name, n_pan } = values;
    const n_dob = datePick;
    const n_relation = selectedCountry;

    setLoading(true); // Start loading indicator

    try {
      // Store nominee details locally
      await AsyncStorage.multiSet([
        ["n_name", n_name],
        ["n_dob", n_dob],
        ["n_pan", n_pan],
        ["n_relation", n_relation],
      ]);

      // Send data to server
      const response = await client.post(
        "/nominee-details",
        { n_name, n_dob, n_pan, n_relation },
        {
          headers: {
            Authorization: `JWT ${await AsyncStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        navigation.navigate("LinkBankAccount");
      } else {
        Alert.alert("Error", "Failed to verify nominee. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while submitting nominee details."
      );
    } finally {
      setLoading(false); // Stop loading indicator
    }

    setSelectedCountry("");
  };

  return (
    <View style={styles.container}>
      {/* Loading Modal */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Verifying nominee details...</Text>
        </View>
      </Modal>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
              >
                {/* Dropdown for Nominee Relation */}
                <SIPDropdown
                  SIPdata={Nominee}
                  leftHeading="Select Nominee Relation"
                />

                {/* Form Fields */}
                <ScrollView style={styles.formContainer}>
                  <Inline
                    leftHeading="Enter Nominee Name"
                    error={touched.n_name && errors.n_name}
                    onBlur={handleBlur("n_name")}
                    placeholder="Enter Nominee Name"
                    autoCapitalize="words"
                    onChangeText={handleChange("n_name")}
                    value={values.n_name}
                  />
                  <DatePicker
                    leftHeading="Select Date Of Birth"
                    placeholder="Select Date Of Birth"
                    value={datePick}
                    onChange={(date) => setDatePick(date)}
                  />
                  <Inline
                    leftHeading="PAN Number (Optional)"
                    error={touched.n_pan && errors.n_pan}
                    onBlur={handleBlur("n_pan")}
                    placeholder="PAN Number"
                    autoCapitalize="characters"
                    maxLength={10}
                    onChangeText={handleChange("n_pan")}
                    value={values.n_pan}
                  />
                </ScrollView>
              </KeyboardAvoidingView>

              {/* Button for Submitting */}
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <OnBtn title="Verify Nominee" handelSubmit={handleSubmit} />
              )}
            </>
          );
        }}
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

export default NomineeDetails;
