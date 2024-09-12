import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import * as Yup from "yup";
import { Formik } from "formik";
import client from "../../api/client";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../../contexts/LoginProvider";

// Validation schema for password inputs
const validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, "Password too short. Minimum 8 characters required.")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

const SetPassword = () => {
  const navigation = useNavigation();
  const { setProfile } = useLogin();
  const [initialValues, setInitialValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [savedMobile, setSavedMobile] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Load initial values from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [password, confirmPassword, mobile, email] =
          await AsyncStorage.multiGet([
            "password",
            "confirmPassword",
            "mobile",
            "email",
          ]);

        setInitialValues({
          password: password[1] || "",
          confirmPassword: confirmPassword[1] || "",
        });
        if (mobile[1]) setSavedMobile(mobile[1]);
        if (email[1]) setSavedEmail(email[1]);
      } catch (error) {
        console.error("Failed to load data from AsyncStorage:", error);
        Alert.alert("Error", "Failed to load data. Please try again.");
      }
    };

    loadData();
  }, []);

  // Handle form submission and API calls
  const signUp = async (values, formikActions) => {
    const { password, confirmPassword } = values;

    const userValues = {
      password,
      confirmPassword,
      mobile: savedMobile,
      email: savedEmail,
    };

    const loginDetails = { password, email: savedEmail };

    setLoading(true); // Start loading indicator
    try {
      // Save passwords to AsyncStorage
      await AsyncStorage.multiSet([
        ["password", password],
        ["confirmPassword", confirmPassword],
      ]);

      // Create user and sign in
      const createUserRes = await client.post("/create-user", userValues);
      const signInRes = await client.post("/sign-in", loginDetails);
      console.log(createUserRes.data);
      console.log(signInRes.data);
      const token = signInRes.data.token;

      // Save token and set profile
      await AsyncStorage.setItem("token", token);
      setProfile(signInRes.data);

      // Navigate to the next screen
      navigation.dispatch(
        StackActions.replace("VerifyPanManualDetails", { token })
      );
    } catch (error) {
      console.error("Error during sign up or sign in:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to set password. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading indicator
      formikActions.setSubmitting(false);
      formikActions.resetForm();
    }
  };

  return (
    <View style={styles.container}>
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
          isSubmitting,
        }) => (
          <>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.formContainer}>
                <Inline
                  leftHeading="Enter Password"
                  error={touched.password && errors.password}
                  onBlur={handleBlur("password")}
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  value={values.password}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                />

                <Inline
                  leftHeading="Confirm Password"
                  error={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                />
              </View>
            </ScrollView>

            <OnBtn
              title={isSubmitting ? "Setting Password..." : "Set Password"}
              handelSubmit={handleSubmit}
              disabled={isSubmitting || loading}
              buttonStyle={styles.button}
            />

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.loadingIndicator}
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
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
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

export default SetPassword;
