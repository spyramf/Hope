import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import Inline from "../../components/MultiUseApp/InLine";
import client from "../../api/client";
import { useLogin } from "../../contexts/LoginProvider";
const { height: screenHeight } = Dimensions.get("window");

const validationSchema = Yup.object({
  email: Yup.string().email("invalid email").required("email required"),
  pan: Yup.string()
    .trim()
    .min(8, "password too short")
    .required("password is required"),
});

const ForgotPassword = () => {
  const { setIsLoggedIn, setProfile } = useLogin(false);

  const navigation = useNavigation();

  const userInfo = {
    email: "",
    pan: "",
  };

  const signIn = async (values) => {
    console.log(values);

    try {
      const res = await client.post("/sign-in", {
        ...values,
      });
      if (res.data.success) {
        setProfile(res.data);

        console.log(res.data);

        const token = res.data.token;
        console.log(token);

        navigation.dispatch(
          StackActions.replace("Home", { token: res.data.token })
        );
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signIn}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { email, password } = values;

          return (
            <>
              <View style={{ marginTop: screenHeight * 0.4 }}>
                <Inline
                  leftHeading="Enter Email Address"
                  error={touched.email && errors.email}
                  onBlur={handleBlur("email")}
                  placeholder="Eg:pradeep@gmail.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  value={email}
                />

                <Inline
                  leftHeading="Enter Pan"
                  error={touched.password && errors.password}
                  onBlur={handleBlur("pan")}
                  placeholder="Enter Pan"
                  autoCapitalize="none"
                  onChangeText={handleChange("pan")}
                  value={password}
                />

                <View style={styles.abcd}>
                  <Pressable onPress={handleSubmit}>
                    <Text style={styles.button}>Forgot Password </Text>
                  </Pressable>
                </View>
              </View>
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
    paddingTop: 32,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#31a062",
    borderRadius: 20,
    paddingVertical: screenHeight * 0.02,
    alignItems: "center",
    margin: screenHeight * 0.001,
    justifyContent: "center",
    color: "#ffff",
    textAlign: "center",
    padding: screenHeight * 0.001,
    fontSize: 22,
    fontWeight: "700",
  },

  linepass: {
    top: screenHeight * 0.01,
    fontWeight: "900",
    color: "#2E436C",
    textAlign: "right",
  },

  signuptext: {
    color: "#2E436C",
    textAlign: "center",
  },

  signup: {
    fontWeight: "900",
    color: "#2E436C",
    textAlign: "center",
  },

  abc: {
    top: screenHeight * 0.05,
  },

  abcd: {
    marginTop: screenHeight * 0.05,
  },

  row: {
    top: screenHeight * 0.02,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default ForgotPassword;
