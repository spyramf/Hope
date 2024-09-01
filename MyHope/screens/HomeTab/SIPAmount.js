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
import axios from "axios";
import SIPDropdown from "../../components/Dropdown/SIPDropdown";
import DatePicker from "../../components/MultiUseApp/DatePicker";
import { Frequency } from "../../components/Dropdown/Dropdown data/DropdownData";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({});

const SIPAmount = ({ route }) => {
  const navigation = useNavigation();

  const { setIsLoggedIn, profile } = useLogin();
  const { selectedCountry, datePick } = useLogin();

  const data = route.params.data;
  console.log(data);
  // setData(data);

  const userInfo = {
    amount: "",
  };
 console.log(datePick);
  const CreateSIP = async (amount) => {
    const pan = amount;

    console.log(pan);
    const loginId = "5526901";
    const memberCode = "55269";
    const password = "Pass@12345";
    const schemeCode = data.SchemeCode;
    const clientCode = profile.user.mobile;
    const intRefNo = "108799";
    const transMode = "P";
    const dpTransMode = "P";
    const startDate ="09/09/2024";
    const frequencyType = selectedCountry;
    const frequencyAllowed = "1";
    const instAmount = "1000";
    const noOfInst = "10";
    const remarks = "";
    const folioNo = "123";
    const firstOrderFlag = "Y";
    const subBrCode = "";
    const euin = "";
    const euinFlag = "N";
    const dpc = "Y";
    const subBrokerArn = "ARN-225204";
    const endDate = "";
    const regnType = "XSIP";
    const brokerage = "";
    const mandateId = "866730";
    const xsipType = "01";
    const targetScheme = "";
    const targetAmount = "";
    const goalType = "";
    const goalAmount = "";
    const apiKey = "VmxST1UyRkhUbkpOVldNOQ==";

    // Construct the data object using the variables
    let data = JSON.stringify({
      LoginId: loginId,
      MemberCode: memberCode,
      Password: password,
      SchemeCode: schemeCode,
      ClientCode: clientCode,
      IntRefNo: intRefNo,
      TransMode: transMode,
      DPTransMode: dpTransMode,
      StartDate: startDate,
      FrequencyType: frequencyType,
      FrequencyAllowed: frequencyAllowed,
      InstAmount: instAmount,
      NoOfInst: noOfInst,
      Remarks: remarks,
      FolioNo: folioNo,
      FirstOrderFlag: firstOrderFlag,
      SubBrCode: subBrCode,
      EUIN: euin,
      EUINFlag: euinFlag,
      DPC: dpc,
      SubBrokerARN: subBrokerArn,
      EndDate: endDate,
      RegnType: regnType,
      Brokerage: brokerage,
      MandateId: mandateId,
      XSIPType: xsipType,
      TargetScheme: targetScheme,
      TargetAmount: targetAmount,
      GoalType: goalType,
      GoalAmount: goalAmount,
      Filler1: "",
      Filler2: "",
      Filler3: "",
      Filler4: "",
      Filler5: "",
      Filler6: "",
      Filler7: "",
      Filler8: "",
      Filler9: "",
      Filler10: "",
    });

    // Construct the config object using the variables
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bsestarmfdemo.bseindia.com/StarMFAPI/api/XSIP/XSIPRegistration",
      headers: {
        "Content-Type": "application/json",
        APIKEY: apiKey,
      },
      data: data,
    };

    // Make the request using axios
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.warn(response.data.BSERemarks);
      })
      .catch((error) => {
        console.log(error);
      });

 navigation.navigate("OrderCompleted", { data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonrow}>
        <View>
          <Image
            style={styles.frameChild}
            source={{
              uri: data.Logo,
            }}
          />
        </View>

        <Text style={[styles.fundName]}>{data.SchemeName}</Text>
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
          amount,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          {
            /* const { amount } = values; */
          }

          return (
            <>
              <View style={{ flex: 1 }}>
                <Inline
                  leftHeading="Investment Amount"
                  error={touched.password && errors.password}
                  onBlur={handleBlur("amount")}
                  placeholder="₹1000"
                  autoCapitalize="none"
                  onChangeText={amount}
                  value={amount}
                  setVa
                />

                <SIPDropdown
                  SIPdata={Frequency}
                  leftHeading="Select Frequency (Daily/Monthly)"
                />
                <DatePicker
                  leftHeading="Select Date Of SIP"
                  placeholder="Select Date Of SIP"
                />
              </View>

              <OnBtn title="Create SIP" handelSubmit={CreateSIP} />
            </>
          );
        }}
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
    height: screenHeight * 0.03,
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
});

export default SIPAmount;
