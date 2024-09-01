import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Dimensions, TouchableHighlight } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import emobstyle from "../resused_style/emobstyle";
import app from '../firebaseConfig';
import { initializeApp } from "firebase/app";
const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");
import { getDatabase, ref, onValue, set, update } from "firebase/database";




const VerifyPan = () => {
  const navigation = useNavigation();

  const [pan, setPan] = useState("");
  const [display, setDisplay] = useState("");

  // const verifyMobileNo = () => {
  //   app.database().ref("users/" + setMobile).set({ /* data to be inserted */ })
  //     .then(() => {
  //       // Handle success
  //       console.log("Data inserted successfully");
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error inserting data: ", error);
  //     });
  // };


  const db = getDatabase(app)
  const dbRef = ref(db, 'users')


  var index = 0

  var refData = "users/" + index

  const dbRefForUpdate = ref(db, refData)
  update(dbRefForUpdate, { "Pan": pan, "First Name": pan, "Last Name": pan, "DOB": pan })



  return (
    <View style={emobstyle.container}>
      <View style={[emobstyle.component, { width: screenWidth }]}>
      </View>
      <View style={[emobstyle.component, { width: screenHeight }]}>

      </View>
      <View style={emobstyle.header}>

        <Pressable onPress={() => navigation.navigate("SetPassword")}>
          <Image style={emobstyle.vectorIcon} source={require("../assets/vector17.png")} />
        </Pressable>

        <View>
          <Text style={emobstyle.mainTitle}>Verify Pan</Text>
        </View>

      </View>



      <View>
        <Text style={emobstyle.pageTitle1}>PAN is Compulsory for investing in India</Text>
      </View>

      <TextInput
        style={emobstyle.input1}
        placeholder="Enter PAN"
        placeholderTextColor="#828282"
        onChangeText={(Text) => setPan(Text)}
        value={pan}
      />







      <TouchableHighlight onPress={() => navigation.navigate("VerifyPanManualDetails")}>
        <Text style={[emobstyle.resendOTP, { marginTop: screenHeight * 0.01 }]} >KYC Not Verified </Text>
      </TouchableHighlight>



      <View>
        {
          display ?
            <View>
              <Text>my Respo : {mobileno} </Text>
            </View>
            : null
        }
      </View>



      <View style={styles.bottombutton}>
        <TouchableHighlight onPress={() => navigation.navigate("TaxStatus")}>
        <Text style={emobstyle.button1} >Verify Mobile No </Text>
      </TouchableHighlight>
      </View>






    </View>
  );
};

const styles = StyleSheet.create({

  bottombutton: {
    top: screenHeight * 0.54,
  },




});

export default VerifyPan;
