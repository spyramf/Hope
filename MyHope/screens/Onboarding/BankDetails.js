import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from "react-native";
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
    .length(11, "Invalid IFSC Code")
    .required("IFSC Code required"),
  accNo: Yup.string()
    .trim()
    .min(9, "Invalid Account Number")
    .required("Account Number required"),
  bankName: Yup.string().trim().required("Bank Name required"),
});

const BankDetails = () => {
  const navigation = useNavigation();
  const { selectedCountry, setSelectedCountry, setProfile, country } =
    useLogin();

  const [initialValues, setInitialValues] = useState({
    ifsc: "",
    accNo: "",
    bankName: "",
    accType: selectedCountry,
  });
  const [loading, setLoading] = useState(false);

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

        setSelectedCountry(storedAccType || selectedCountry);
      } catch (error) {
        Alert.alert("Error", "Failed to load saved data.");
        console.error("Error loading stored values:", error);
      }
    };

    loadStoredValues();
  }, []);

  const signUp = async (values) => {
    setLoading(true);
    try {
      const { ifsc, accNo, bankName } = values;
      const accType = country;

      await AsyncStorage.multiSet([
        ["ifsc", ifsc],
        ["accNo", accNo],
        ["bankName", bankName],
        ["accType", accType],
      ]);

      const result = await client.post("/create-ucc");
      const ucc = result.data.serialNumber;
      await AsyncStorage.setItem("ucc", ucc);

      const myResult = await client.post(
        "/ucc-details",
        { ucc },
        {
          headers: {
            Authorization: "JWT " + (await AsyncStorage.getItem("token")),
            "Content-Type": "application/json",
          },
        }
      );

      const res = await client.post(
        "/bank-details",
        { ifsc, accNo, bankName, accType },
        {
          headers: {
            Authorization: "JWT " + (await AsyncStorage.getItem("token")),
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");

        const loginRes = await client.post("/sign-in", { email, password });
        if (loginRes.data.success) {
          setProfile(loginRes.data);
          await AsyncStorage.setItem(
            "LoginData",
            JSON.stringify(loginRes.data)
          );
          navigation.navigate("ProcessCompleted");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit bank details.");
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }

    setSelectedCountry("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          }) => (
            <>
              <View style={styles.formContainer}>
                <SIPDropdown
                  SIPdata={Account}
                  leftHeading="Select Account Type"
                />

                <ScrollView>
                  <View style={styles.inputGroup}>
                    <Inline
                      leftHeading="Enter IFSC Code"
                      error={touched.ifsc && errors.ifsc}
                      onBlur={handleBlur("ifsc")}
                      placeholder="Enter IFSC Code"
                      autoCapitalize="characters"
                      onChangeText={handleChange("ifsc")}
                      value={values.ifsc}
                    />

                    <Inline
                      leftHeading="Bank Name"
                      error={touched.bankName && errors.bankName}
                      onBlur={handleBlur("bankName")}
                      placeholder="Bank Name"
                      autoCapitalize="words"
                      onChangeText={handleChange("bankName")}
                      value={values.bankName}
                    />

                    <Inline
                      leftHeading="Enter Account Number"
                      error={touched.accNo && errors.accNo}
                      onBlur={handleBlur("accNo")}
                      placeholder="Enter Account Number"
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      onChangeText={handleChange("accNo")}
                      value={values.accNo}
                    />
                  </View>
                </ScrollView>
              </View>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <OnBtn title="Verify Bank" handelSubmit={handleSubmit} />
              )}
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    flex: 1,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
});

export default BankDetails;
