import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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

const validationSchema = Yup.object({
  n_name: Yup.string().trim().min(3, "Invalid Name").required("Name required"),
  n_pan: Yup.string().trim().min(9, "Invalid PAN"),
});

const NomineeDetails = () => {
  const {
    profile,
    selectedCountry,
    setSelectedCountry,
    datePick,
    setDatePick,
  } = useLogin();
  const navigation = useNavigation();
  const token = profile.token;
const selectedNominee = selectedCountry;
  const [initialValues, setInitialValues] = useState({
    n_name: "",
    n_dob: "",
    n_pan: "",
    n_relation: selectedNominee,
  });

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
          n_relation: storedRelation || selectedNominee,
        });

     // update the selected relation
        setDatePick(storedDob || ""); // update the date of birth
      } catch (error) {
        console.log("Error loading stored values:", error);
      }
    };

    loadStoredValues();
  }, []);

  const signUp = async (values) => {
    const n_name = values.n_name;
    const n_dob = datePick;
    const n_pan = values.n_pan;
    const n_relation = selectedNominee;

    const data = { n_name, n_dob, n_pan, n_relation };

    try {
      // Store nominee details in AsyncStorage
      await AsyncStorage.setItem("n_name", n_name);
      await AsyncStorage.setItem("n_dob", n_dob);
      await AsyncStorage.setItem("n_pan", n_pan);
      await AsyncStorage.setItem("n_relation", n_relation);

      // Send the data to the server
      const res = await client.post(
        "/nominee-details",
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
        navigation.navigate("PoliticallyExposed");
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
          const { n_name, n_pan } = values;

          return (
            <>
              <View style={{ flex: 1 }}>
                <SIPDropdown
                  SIPdata={Nominee}
                  leftHeading="Select Nominee Relation"
                />

                <ScrollView>
                  <View>
                    <Inline
                      leftHeading="Enter Nominee Name"
                      error={touched.n_name && errors.n_name}
                      onBlur={handleBlur("n_name")}
                      placeholder="Enter Nominee Name"
                      autoCapitalize="words"
                      onChangeText={handleChange("n_name")}
                      value={n_name}
                    />

                    <DatePicker
                      leftHeading="Select Date Of Birth"
                      placeholder="Select Date Of Birth"
                      value={datePick}
                    />

                    <Inline
                      leftHeading="PAN Number (Optional)"
                      error={touched.n_pan && errors.n_pan}
                      onBlur={handleBlur("n_pan")}
                      placeholder="PAN Number"
                      autoCapitalize="characters"
                      maxLength={10}
                      onChangeText={handleChange("n_pan")}
                      value={n_pan}
                    />
                  </View>
                </ScrollView>
              </View>
              <OnBtn title="Verify Nominee" handelSubmit={handleSubmit} />
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

export default NomineeDetails;
