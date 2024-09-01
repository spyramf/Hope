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
import { Account } from "../../components/Dropdown/Dropdown data/DropdownData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object({
  ifsc: Yup.string()
    .trim()
    .min(3, "Invalid IFSC Code")
    .required("IFSC Code required"),
  accNo: Yup.string()
    .trim()
    .min(3, "Invalid Account Number")
    .required("Account Number required"),
  bankName: Yup.string().trim().required("Bank Name Required"),
});

const BankDetails = () => {
  const navigation = useNavigation();
  const { selectedCountry, setSelectedCountry } = useLogin();
  const { profile, pass, setProfile } = useLogin();
  const token = profile.token;

  const [initialValues, setInitialValues] = useState({
    ifsc: "",
    accNo: "",
    bankName: "",
    accType: selectedCountry,
  });

  useEffect(() => {
    const loadStoredValues = async () => {
      try {
        const storedIfsc = await AsyncStorage.getItem("ifsc");
        const storedAccNo = await AsyncStorage.getItem("accNo");
        const storedBankName = await AsyncStorage.getItem("bankName");
        const storedAccType = await AsyncStorage.getItem("accType");

        setInitialValues({
          ifsc: storedIfsc || "",
          accNo: storedAccNo || "",
          bankName: storedBankName || "",
          accType: storedAccType || selectedCountry,
        });

        setSelectedCountry(storedAccType || selectedCountry); // update selected account type
      } catch (error) {
        console.log("Error loading stored values:", error);
      }
    };

    loadStoredValues();
  }, []);

  const signUp = async (values) => {
    const ifsc = values.ifsc;
    const accType = selectedCountry;
    const bankName = values.bankName;
    const accNo = values.accNo;

    const data = { accNo, bankName, accType, ifsc };

    try {
      // Store bank details in AsyncStorage
      await AsyncStorage.setItem("ifsc", ifsc);
      await AsyncStorage.setItem("accNo", accNo);
      await AsyncStorage.setItem("bankName", bankName);
      await AsyncStorage.setItem("accType", accType);

      // Send the data to the server
      const res = await client.post(
        "/bank-details",
        { data },
        {
          headers: {
            Authorization: "JWT " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await client.post("/sign-in", { ...pass });
      setProfile(result.data);
      navigation.navigate("ProcessCompleted");
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
          const { ifsc, accNo, bankName } = values;

          return (
            <>
              <View style={{ flex: 1 }}>
                <SIPDropdown
                  SIPdata={Account}
                  leftHeading="Select Account Type"
                />

                <ScrollView>
                  <View>
                    <Inline
                      leftHeading="Enter IFSC Code"
                      error={touched.ifsc && errors.ifsc}
                      onBlur={handleBlur("ifsc")}
                      placeholder="Enter IFSC Code"
                      autoCapitalize="characters"
                      onChangeText={handleChange("ifsc")}
                      value={ifsc}
                    />

                    <Inline
                      leftHeading="Bank Name"
                      error={touched.bankName && errors.bankName}
                      onBlur={handleBlur("bankName")}
                      placeholder="Bank Name"
                      autoCapitalize="words"
                      onChangeText={handleChange("bankName")}
                      value={bankName}
                    />

                    <Inline
                      leftHeading="Enter Account Number"
                      error={touched.accNo && errors.accNo}
                      onBlur={handleBlur("accNo")}
                      placeholder="Enter Account Number"
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      onChangeText={handleChange("accNo")}
                      value={accNo}
                    />
                  </View>
                </ScrollView>
              </View>
              <OnBtn title="Verify Bank" handelSubmit={handleSubmit} />
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

export default BankDetails;
