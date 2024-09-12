import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding } from "../../GlobalStyles";
import Inline from "../../components/MultiUseApp/InLine";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../../contexts/LoginProvider";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import SIPDropdown from "../../components/Dropdown/SIPDropdown";
import DatePicker from "../../components/MultiUseApp/DatePicker";
import { Frequency } from "../../components/Dropdown/Dropdown data/DropdownData";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
const sendXSipRequest = require("../../api/XSipServices");
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Add validation schema for amount, datePick, and Frequency
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("Investment amount is required")
    .min(1000, "Minimum amount is ₹1000"),
});

const SIPAmount = ({ route }) => {
  const navigation = useNavigation();

  const { setIsLoggedIn, profile } = useLogin();
  const { selectedCountry, datePick, setDatePick, setSelectedCountry } =
    useLogin();

  const data = route.params?.data || {};
  // console.log(data);

  const userInfo = {
    amount: "",
  };

  const CreateSIP = async (values, { setSubmitting, setErrors }) => {
    try {
      // Ensure required fields are filled
      if (!datePick || !selectedCountry) {
        if (!datePick) setErrors({ datePick: "Date is required" });
        if (!selectedCountry)
          setErrors({ selectedCountry: "Frequency is required" });
        setSubmitting(false); // Stop submission
        return;
      }

      // Generate random integers for InternalRefNo and UniqueRefNo
      const InternalRefNo = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const UniqueRefNo = Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString();

      const formData = {
        datePick,
        Frequency: selectedCountry,
        amount: values.amount,
      };

      const SchemeCode = data.SchemeCode;
      const ucc = "IW50078199";
      const StartDate = formData.datePick;
      const FrequencyType = formData.Frequency;
      const InstallmentAmount = formData.amount;
      const MandateID = "9280945";

      // Try sending the SIP request
      const XSipResponse = await sendXSipRequest({
        SchemeCode,
        ucc,
        StartDate,
        FrequencyType,
        InstallmentAmount,
        MandateID,
        InternalRefNo,
        UniqueRefNo,
      });

      if (XSipResponse) {
        console.log("SIP created successfully!");
      } else {
        throw new Error("Failed to create SIP.");
      }

      // Reset state after successful submission
      setDatePick("");
      setSelectedCountry("");
    } catch (error) {
      console.error("Error in CreateSIP:", error.message || error);
      setErrors({
        apiError: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false); // Always stop submission after handling
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonrow}>
        <View>
          <Image
            style={styles.frameChild}
            source={{
              uri: data.Logo || "default_logo_url",
            }}
          />
        </View>

        <Text style={[styles.fundName]}>
          {data.SchemeName || "Scheme Name"}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: screenHeight * 0.03,
        }}
      >
        <SelectOnBtn
          title="One Time"
          handelSubmit={() => navigation.navigate("PurchaseSIP", { data })}
        />

        <SelectOnBtn
          title=" Start SIP"
          handelSubmit={() => navigation.navigate("SIPAmount", { data })}
        />
      </View>

      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={CreateSIP}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setErrors,
        }) => (
          <>
            <View style={{ flex: 1 }}>
              <Inline
                leftHeading="Investment Amount"
                onBlur={handleBlur("amount")}
                placeholder="₹1000"
                autoCapitalize="none"
                onChangeText={handleChange("amount")}
                value={values.amount}
              />
              {touched.amount && errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}

              <SIPDropdown
                SIPdata={Frequency}
                leftHeading="Select Frequency (Daily/Monthly)"
              />
              {errors.selectedCountry && (
                <Text style={styles.errorText}>{errors.selectedCountry}</Text>
              )}

              <DatePicker
                leftHeading="Select Date Of SIP"
                placeholder="Select Date Of SIP"
              />
              {errors.datePick && (
                <Text style={styles.errorText}>{errors.datePick}</Text>
              )}
            </View>

            {errors.apiError && (
              <Text style={styles.errorText}>{errors.apiError}</Text>
            )}

            <OnBtn
              title="Create SIP"
              handelSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  frameChild: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
  },
  fundName: {
    fontSize: FontSize.size_5xl,
    width: "85%",
    height: screenHeight * 0.08,
    fontWeight: "700",
    color: "#2E436C",
    textAlignVertical: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: Padding.p_3xs,
  },
  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    fontSize: FontSize.size_sm,
    marginTop: 5,
  },
});

export default SIPAmount;
