import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import * as Yup from "yup";
import { Formik } from "formik";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import { Padding } from "../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object({
  mobile: Yup.string()
    .min(10, "Incorrect Mobile Number")
    .max(10, "Incorrect Mobile Number")
    .required("Mobile Number is Required"),
});

const MobileNo = (props) => {
  const navigation = useNavigation();
  const [initialMobile, setInitialMobile] = useState(null); // Set to null initially

  useEffect(() => {
    const loadMobile = async () => {
      try {
        const savedMobile = await AsyncStorage.getItem("mobile");
        if (savedMobile) {
          setInitialMobile(savedMobile); // Set initialMobile state with saved mobile number
        } else {
          setInitialMobile(""); // Set to empty string if no value is found
        }
      } catch (error) {
        console.log("Failed to load mobile number:", error);
        setInitialMobile(""); // Ensure initialMobile is not null if there's an error
      }
    };
    loadMobile();
  }, []);

  const signUp = async (values) => {
    const { mobile } = values;
    const mobileNumber = "91" + mobile;
    try {
      await AsyncStorage.setItem("mobile", mobile);
      const phoneNumber = mobileNumber; // Replace with the actual phone number
      const channel = "SMS";
      const otpResponse = await sendOtpRequest({ phoneNumber }, { channel });
      navigation.navigate("OTP Verification");
      console.log("Response from OTP service:", otpResponse);
    } catch (error) {
      console.error("Failed to request OTP:", error);
    }
  };

  if (initialMobile === null) {
    return null; // Render nothing or a loading indicator while the mobile number is being loaded
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ mobile: initialMobile }}
        enableReinitialize={true} // Ensures that the form is reinitialized when initialValues change
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
              <View style={{ flex: 1 }}>
                <View>
                  <Inline
                    leftHeading="Enter Mobile Number"
                    error={touched.mobile && errors.mobile}
                    onBlur={handleBlur("mobile")}
                    placeholder="Enter Mobile Number"
                    autoCapitalize="none"
                    onChangeText={handleChange("mobile")}
                    keyboardType="numeric"
                    maxLength={10}
                    value={values.mobile}
                  />
                </View>
              </View>
              <OnBtn title="Verify Mobile" handelSubmit={handleSubmit} />
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
    padding: Padding.p_3xs,
    paddingTop: 32,
  },
});

export default MobileNo;
