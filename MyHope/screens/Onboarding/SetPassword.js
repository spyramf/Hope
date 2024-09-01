import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import * as Yup from "yup";
import { Formik } from "formik";
import client from "../../api/client";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../../contexts/LoginProvider";

const validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, "Password too Short")
    .required("Password is required"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match"
  ),
});

const SetPassword = (props) => {
  const navigation = useNavigation();
  const { setProfile, setPass } = useLogin(false);
  const [initialPassword, setInitialPassword] = useState("");
  const [initialConfirmPassword, setInitialConfirmPassword] = useState("");
  const [savedMobile, setSavedMobile] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  useEffect(() => {
    const loadPassword = async () => {
      try {
        const savedPassword = await AsyncStorage.getItem("password");
        const savedConfirmPassword = await AsyncStorage.getItem(
          "confirmPassword"
        );
        const mobile = await AsyncStorage.getItem("mobile");
        const email = await AsyncStorage.getItem("email");

        if (mobile) setSavedMobile(mobile);
        if (email) setSavedEmail(email);
        if (savedPassword) setInitialPassword(savedPassword);
        if (savedConfirmPassword)
          setInitialConfirmPassword(savedConfirmPassword);
      } catch (error) {
        console.log("Failed to load password:", error);
      }
    };
    loadPassword();
  }, []);

  const signUp = async (values, formikActions) => {
    const { password, confirmPassword, } =
      values;
    console.log(values);


      const userValues = {
        ...values,
        mobile: savedMobile, // Use savedMobile
        email: savedEmail, // Use savedEmail
      };
 console.log(userValues);

const loginDetails = { password: password, email: savedEmail };
    console.log(loginDetails);

    try {
      // Save password and confirmPassword
      await AsyncStorage.multiSet([
        ["password", password],
        ["confirmPassword", confirmPassword],
      ]);

      // Create user and sign in
      const res = await client.post("/create-user", userValues);
      const result = await client.post("/sign-in", loginDetails);

      const token = result.data.token;

      // Save the token in AsyncStorage
      await AsyncStorage.setItem("token", token);

      if (result.data.success) {
        setProfile(result.data);
        navigation.dispatch(
          StackActions.replace("VerifyPanManualDetails", {
            token,
          })
        );
      }

      console.log(res.data);
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          password: initialPassword,
          confirmPassword: initialConfirmPassword,
        }}
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
        }) => {
          return (
            <>
              <ScrollView>
                <View>
                  <Inline
                    leftHeading="Enter Password"
                    error={touched.password && errors.password}
                    onBlur={handleBlur("password")}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={handleChange("password")}
                    value={values.password}
                  />

                  <Inline
                    leftHeading="Confirm Password"
                    error={touched.confirmPassword && errors.confirmPassword}
                    onBlur={handleBlur("confirmPassword")}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    onChangeText={handleChange("confirmPassword")}
                    value={values.confirmPassword}
                  />
                </View>
              </ScrollView>

              <OnBtn title="Set Password" handelSubmit={handleSubmit} />
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
    padding: 10,
  },
});

export default SetPassword;
