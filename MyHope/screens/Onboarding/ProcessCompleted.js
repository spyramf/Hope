import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import OnBtn from "../../components/MultiUseApp/OnBtn";
import client from "../../api/client";
import axios from "axios";
import { useNavigation, StackActions } from "@react-navigation/native";
const { height: height } = Dimensions.get("window");
const { width: width } = Dimensions.get("window");
import { useLogin } from "../../contexts/LoginProvider";
const ProcessCompleted = () => {
  const navigation = useNavigation();
  const { setIsLoggedIn, profile, selectedCountry, setSelectedCountry } =
    useLogin();

  const bot = profile.user.dob;

  console.log(bot);
  const UCCGen = async () => {
    const url =
      "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/api/ClientRegistration/Registration";

    const headers = {
      "Content-Type": "application/json",
      APIKEY: "VmxST1UyRkhUbkpOVldNOQ==", // Add your API key here
      // Add any other headers as needed
    };

    // Define your variables
    const userId = "5526901";
    const memberCode = "55269";
    const password = "Pass@12345";
    const regnType = "NEW";
    const regnId = profile.user.mobile;
    const firstName = profile.user.firstName;
    const middleName = "Hari";
    const lastName = profile.user.lastName;
    const gender = profile.user.gender;
    const dob = profile.user.dob;
    const pan = profile.user.pan;
    const accountType = profile.user.accType;
    const accountNumber = profile.user.accNo;
    const ifsc = profile.user.ifsc;
    const fullName = `${firstName} ${lastName}`;
    const addressLine1 = profile.user.add;
    const addressLine2 = "ADD2";
    const addressLine3 = "ADD3";
    const city = profile.user.city;
    const state = profile.user.state;
    const postalCode = profile.user.pin;
    const country = "INDIA";
    const mobile = profile.user.mobile;
    const email = profile.user.email;
    const fatherName = profile.user.n_name;
    const relationship = profile.user.father;
    const occupation = "100";

    const param = `${regnId}|${firstName}|${middleName}|${lastName}|01|${gender}|${dob}|01|SI|||||||||||||N||||${pan}||||||||P||||||||${accountType}|${accountNumber}||${ifsc}|Y|||||||||||||||||||||${fullName}|01|${addressLine1}|${addressLine2}|${addressLine3}|${city}|${state}|${postalCode}|${country}|${mobile}||||${email}|M||||||||||||${mobile}|${fatherName}|${relationship}|${occupation}|N|||||||||||||||E||||||||||||Y||Z|||SE|SE|Y|O||||||||||||||`;

    const data = {
      UserId: userId,
      MemberCode: memberCode,
      Password: password,
      RegnType: regnType,
      Param: param,
      Filler2: "",
    };

    axios
      .post(url, data, { headers })
      .then((response) => {
        console.warn(response.data.Remarks);
      })
      .catch((error) => {
        console.error(error);
      });

    navigation.dispatch(StackActions.replace("Home"));
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Image
          source={require("../../screens/AppImage/Completed.png")}
          style={{
            alignItem: "center",
            width: width * 1,
            height: height * 0.7,
          }}
        />
      </View>
      <View style={{ top: height * 0.05 }}>
        <OnBtn title="Process Completed" handelSubmit={UCCGen} />
      </View>
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

export default ProcessCompleted;
