import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../api/client";
import { useLogin } from "../../contexts/LoginProvider";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import DatePicker from "../../components/MultiUseApp/DatePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validation schema for the form
const validationSchema = Yup.object({
  pan: Yup.string()
    .trim()
    .length(10, "Invalid PAN")
    .required("PAN is required"),
  firstName: Yup.string()
    .trim()
    .min(3, "Invalid name")
    .required("First name is required"),
  lastName: Yup.string()
    .trim()
    .min(3, "Invalid name")
    .required("Last name is required"),
});

const VerifyPanManualDetails = () => {
  const navigation = useNavigation();
  const { setProfile, datePick } = useLogin();
  const [initialValues, setInitialValues] = useState({
    pan: "",
    firstName: "",
    lastName: "",
  });

  // Load initial form values from AsyncStorage
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [pan, firstName, lastName, dob] = await AsyncStorage.multiGet([
          "pan",
          "firstName",
          "lastName",
          "dob",
        ]);

        setInitialValues({
          pan: pan[1] || "",
          firstName: firstName[1] || "",
          lastName: lastName[1] || "",
        });
      } catch (error) {
        console.error("Failed to load form data:", error);
        Alert.alert("Error", "Failed to load form data. Please try again.");
      }
    };

    loadFormData();
  }, []);

  // Handle form submission and API call
  const signUp = async (values, formikActions) => {
    const { pan, firstName, lastName } = values;
    const dateOfBirth = datePick; // Access the selected date from context

    try {
      // Save form values to AsyncStorage
      await AsyncStorage.multiSet([
        ["pan", pan],
        ["firstName", firstName],
        ["lastName", lastName],
        ["dob", dateOfBirth],
      ]);

      const data = { dob: dateOfBirth, pan, firstName, lastName };

      // Make an API request to verify PAN
      const res = await client.post(
        "/enter-pan",
        { data },
        {
          headers: {
            Authorization: "JWT " + (await AsyncStorage.getItem("token")),
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      if (res.data.success) {
        setProfile(res.data);
        navigation.navigate("Gender");
      } else {
        Alert.alert(
          "Verification Failed",
          res.data.message || "PAN verification failed."
        );
      }
    } catch (error) {
      console.error("Error during PAN verification:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      formikActions.setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} // Ensure form reinitializes when initialValues change
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.formGroup}>
                <Inline
                  leftHeading="Enter PAN Number"
                  error={touched.pan && errors.pan}
                  onBlur={handleBlur("pan")}
                  placeholder="Enter PAN Number"
                  autoCapitalize="characters"
                  maxLength={10}
                  onChangeText={handleChange("pan")}
                  value={values.pan}
                  inputStyle={styles.input}
                />

                <Inline
                  leftHeading="Enter First Name"
                  error={touched.firstName && errors.firstName}
                  onBlur={handleBlur("firstName")}
                  placeholder="First Name"
                  autoCapitalize="words"
                  onChangeText={handleChange("firstName")}
                  value={values.firstName}
                  inputStyle={styles.input}
                />

                <Inline
                  leftHeading="Enter Last Name"
                  error={touched.lastName && errors.lastName}
                  onBlur={handleBlur("lastName")}
                  placeholder="Last Name"
                  autoCapitalize="words"
                  onChangeText={handleChange("lastName")}
                  value={values.lastName}
                  inputStyle={styles.input}
                />

                <DatePicker
                  leftHeading="Select Date of Birth"
                  placeholder="Select Date of Birth"
                  dateStyle={styles.datePicker}
                />
              </View>
            </ScrollView>

            <View style={styles.btnContainer}>
              <OnBtn
                title={
                  isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    "Verify PAN"
                  )
                }
                handelSubmit={handleSubmit}
                disabled={isSubmitting}
                btnStyle={styles.button}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
    paddingTop: 32,
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  formGroup: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  datePicker: {
    marginVertical: 8,
  },
  btnContainer: {
    paddingVertical: 16,

  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VerifyPanManualDetails;
