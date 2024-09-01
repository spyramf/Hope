import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Inline from "../../components/MultiUseApp/InLine";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../api/client";
import { useLogin } from "../../contexts/LoginProvider";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import DatePicker from "../../components/MultiUseApp/DatePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object({
  pan: Yup.string().trim().min(9, "Invalid PAN").required("PAN is Required"),
  firstName: Yup.string()
    .trim()
    .min(3, "Invalid Name")
    .required("Name is Required"),
  lastName: Yup.string()
    .trim()
    .min(3, "Invalid Name")
    .required("Name is Required"),
});

const VerifyPanManualDetails = () => {
  const navigation = useNavigation();
  const { setProfile, profile, pass, datePick } = useLogin();
  const token = profile.token;
  const dateOfBirth = datePick;
  const [initialValues, setInitialValues] = useState({
    pan: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const savedPan = await AsyncStorage.getItem("pan");
        const savedFirstName = await AsyncStorage.getItem("firstName");
        const savedLastName = await AsyncStorage.getItem("lastName");
        const savedDob = await AsyncStorage.getItem("dob");

        setInitialValues({
          pan: savedPan || "",
          firstName: savedFirstName || "",
          lastName: savedLastName || "",
          dob: savedDob || "",
        });
      } catch (error) {
        console.log("Failed to load form data:", error);
      }
    };

    loadFormData();
  }, []);

  const signUp = async (values) => {
    const { pan, firstName, lastName } = values;

    try {
      await AsyncStorage.setItem("pan", pan);
      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorage.setItem("lastName", lastName);
      await AsyncStorage.setItem("dob", dateOfBirth);

      const data = { dob: dateOfBirth, pan, firstName, lastName };
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} // Reinitialize form when initial values change
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
                    leftHeading="Enter PAN Number"
                    error={touched.pan && errors.pan}
                    onBlur={handleBlur("pan")}
                    placeholder="Enter PAN Number"
                    autoCapitalize="characters"
                    maxLength={10}
                    onChangeText={handleChange("pan")}
                    value={values.pan}
                  />

                  <Inline
                    leftHeading="Enter First Name"
                    error={touched.firstName && errors.firstName}
                    onBlur={handleBlur("firstName")}
                    placeholder="First Name"
                    autoCapitalize="words"
                    onChangeText={handleChange("firstName")}
                    value={values.firstName}
                  />

                  <Inline
                    leftHeading="Enter Last Name"
                    error={touched.lastName && errors.lastName}
                    onBlur={handleBlur("lastName")}
                    placeholder="Last Name"
                    autoCapitalize="words"
                    onChangeText={handleChange("lastName")}
                    value={values.lastName}
                  />

                  <DatePicker
                    leftHeading="Select Date Of Birth"
                    placeholder="Select Date Of Birth"
                  />
                </View>
              </ScrollView>

              <OnBtn title="Verify PAN" handelSubmit={handleSubmit} />
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

export default VerifyPanManualDetails;
