import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import * as Yup from "yup";
import { Formik } from "formik";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { Padding } from "../../GlobalStyles";

const validationSchema = Yup.object({
  otp: Yup.string()
    .min(4, "OTP must be exactly 4 digits")
    .max(4, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

const OtpVerify = () => {
  const navigation = useNavigation();

  const signUp = async (values) => {
    try {
      navigation.navigate("EmailAddress");
    } catch (error) {
      console.log("Failed to process:", error);
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
        }) => (
          <>
            <View style={{ flex: 1 }}>
              <Inline
                leftHeading="Enter Your OTP"
                error={touched.otp && errors.otp}
                onBlur={handleBlur("otp")}
                placeholder="Enter Your OTP"
                autoCapitalize="none"
                onChangeText={handleChange("otp")}
                keyboardType="numeric"
                maxLength={4} // OTP is 4 digits
                value={values.otp}
              />
            </View>
            <OnBtn title="OTP Verification" handelSubmit={handleSubmit} />
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
});

export default OtpVerify;
