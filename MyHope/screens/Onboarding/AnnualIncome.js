import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../contexts/LoginProvider";
import SelectOnBtn from "../../components/MultiUseApp/SelectOnBtn";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height: screenHeight } = Dimensions.get("window");

const AnnualIncome = (props) => {
  const navigation = useNavigation();
  const { setIsLoggedIn, profile } = useLogin()



const token = profile.token



  const gender = props.route.params.gen.gender
  const taxStatus = props.route.params.gen.taxStatus


  console.log(gender)

console.log(taxStatus);

  // const ucc = profile
  // console.log(ucc)


  const up1 = async () => {

    const gen = { annualIncome: 'I', gender, taxStatus, }
    console.log(gen)
    await AsyncStorage.setItem("annualIncome", "I");
    let data = JSON.stringify({ gen });

    console.log(data)

    try {
      const res = await client.post(
        "/annual-income",
        { gen },
        {
          headers: {
            Authorization: "JWT " + (await AsyncStorage.getItem("token")),
            "Content-Type": "application/json",
          },

          data: data,
        }
      );
      console.log(res.data.gen)
      console.log(res)
      if (res.data.success) {
        navigation.navigate("PersonalDetails")
      };

    } catch (error) {
      console.log(error.message)
    }

  }








  const in1to5 = async () => {

    const gen = { annualIncome: 'F', gender, taxStatus }

    console.log(props.route.params.gen)


    props.navigation.navigate("AnnualIncome", { gen })
  }


  const in5to10 = async () => {

    const gen = { annualIncome: 'O', gender, taxStatus }

    props.navigation.navigate("AnnualIncome", { gen })
  }

  const in10to25 = async () => {

    const gen = { annualIncome: 'M', gender, taxStatus }

    props.navigation.navigate("AnnualIncome", { gen })
  }

  const in25to50 = async () => {

    const gen = { annualIncome: 'F', gender, taxStatus }

    props.navigation.navigate("AnnualIncome", { gen })
  }


  const in50to100 = async () => {

    const gen = { annualIncome: 'O', gender, taxStatus }

    props.navigation.navigate("AnnualIncome", { gen })
  }

  return (


    <View style={styles.container}>





      <View>
        <Text style={styles.SubPageTitle}>Select one of the option</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
        <SelectOnBtn title="Up 1 L" handelSubmit={up1} />
        <SelectOnBtn title="1 L - 5 L" handelSubmit={in1to5} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
        <SelectOnBtn title="5 L - 10 L" handelSubmit={in5to10} />
        <SelectOnBtn title="10 L - 25 L" handelSubmit={in10to25} />
      </View>



      <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
        <SelectOnBtn title="25 L - 50 L" handelSubmit={in25to50} />
        <SelectOnBtn title="50 L - 1 Cr" handelSubmit={in50to100} />
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
  SubPageTitle: {
    fontSize: 16,
    color: "#2e436c",
    fontWeight: "500",
    lineHeight: screenHeight * 0.03,
    marginTop: screenHeight * 0.03,
    marginBottom: screenHeight * 0.01,
  },
});



export default AnnualIncome;


