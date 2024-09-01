import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
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

const validationSchema = Yup.object({
  add: Yup.string()
    .trim()
    .min(3, "Invalid Address")
    .required("Address required"),
  pin: Yup.string().trim().min(6, "Invalid PIN").required("PIN required"),
  city: Yup.string().trim().required("City required"),
});

const PersonalDetails = () => {
  const navigation = useNavigation();
  const { profile, selectedCountry, setSelectedCountry } = useLogin();
  const token = profile.token;

  const [initialValues, setInitialValues] = useState({
    add: "",
    pin: "",
    city: "",
    state: "",
  });

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

      // update the selected state
      } catch (error) {
        console.log("Error loading stored values:", error);
      }
    };

    loadStoredValues();
  }, []);

  const signUp = async (values) => {
    const { add, pin, city } = values;
    const data = { state: selectedCountry, add, pin, city };

    try {
      // Store personal details in AsyncStorage
      await AsyncStorage.setItem("add", add);
      await AsyncStorage.setItem("pin", pin);
      await AsyncStorage.setItem("city", city);
      await AsyncStorage.setItem("state", selectedCountry);

      // Send the data to the server
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

      console.log(res.data);

      if (res.data.success) {
        navigation.navigate("Occupation");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }

    setSelectedCountry("");
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} // Allows form to reinitialize with updated initial values
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
          const { add, pin, city } = values;

          return (
            <>
              <View style={{ flex: 1 }}>
                <SIPDropdown SIPdata={State} leftHeading="Select Your State" />

                <ScrollView>
                  <View>
                    <Inline
                      leftHeading="Enter Your Address"
                      error={touched.add && errors.add}
                      onBlur={handleBlur("add")}
                      placeholder="Enter Your Address"
                      autoCapitalize="words"
                      onChangeText={handleChange("add")}
                      value={add}
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
                      value={pin}
                    />

                    <Inline
                      leftHeading="Enter Your City"
                      error={touched.city && errors.city}
                      onBlur={handleBlur("city")}
                      placeholder="Enter Your City"
                      autoCapitalize="words"
                      onChangeText={handleChange("city")}
                      value={city}
                    />
                  </View>
                </ScrollView>
              </View>

              <OnBtn title="Verify Details" handelSubmit={handleSubmit} />
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

export default PersonalDetails;
