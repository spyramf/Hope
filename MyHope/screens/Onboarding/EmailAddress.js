import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import * as Yup from "yup";
import { Formik } from "formik";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email Address Required"),
});

const EmailAddress = (props) => {
  const navigation = useNavigation();
  const [initialEmail, setInitialEmail] = useState(null); // Start with null

  useEffect(() => {
    const loadEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        if (savedEmail) {
          setInitialEmail(savedEmail);
        } else {
          setInitialEmail(""); // Set to empty string if no value is found
        }
      } catch (error) {
        console.log("Failed to load email:", error);
        setInitialEmail(""); // Ensure initialEmail is not null in case of error
      }
    };
    loadEmail();
  }, []);

  const signUp = async (values) => {
    const { email } = values;

    try {
      await AsyncStorage.setItem("email", email);
      props.navigation.navigate("SetPassword", { values });
    } catch (error) {
      console.log("Failed to save email:", error);
    }
  };

  if (initialEmail === null) {
    return null; // Render nothing or a loading indicator while the email is being loaded
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: initialEmail,
          mobile: props.route.params.mobile,
        }}
        enableReinitialize={true} // Ensure the form is reinitialized when initialValues change
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
                    leftHeading="Enter Email Address"
                    error={touched.email && errors.email}
                    onBlur={handleBlur("email")}
                    placeholder="Enter Your Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                  />
                </View>
              </ScrollView>
              <OnBtn title="Verify Email" handelSubmit={handleSubmit} />
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
});

export default EmailAddress;
