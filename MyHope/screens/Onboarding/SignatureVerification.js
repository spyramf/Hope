import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import client from "../app/api/client";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignatureVerification = () => {

  const [profileImage, setProfileImage] = useState('')

  openImageLibrary = async () => {



    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      alert('sorry, we need camera roll permission to make this work');
    }

    if (status == "granted") {


      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],

      });

      if (!response.canceled) { setProfileImage(response.assets[0].uri) }
    }
  }

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + "_profile",
      uri: profileImage,
      type: 'image/jpg'
    })

    try {
      const res = await client.post('/upload-profile', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ3ODMyMGMzNDJiMmNhMWE3MTY3MzYiLCJpYXQiOjE3MTU5Njg5NDUsImV4cCI6MTcxNjA1NTM0NX0.WZlfMJF96mZGH63KZnO4RXMWU5zuRC-lIoJPUxN1xx0'

        },
  
      })
      console.log(res.data)

    } catch (error) {
      console.log(error.message)
    }

  }
  // console.log(profileImage)

  return (
    <View style={styles.container}>
      <Pressable onPress={openImageLibrary} style={styles.uploadImage}>
        {profileImage ? <Image source={{ uri: profileImage }} style={{ width: "100%", height: "100%" }} /> : <Text style={{ textAlign: "center" }}> Upload Profile Image </Text>}
      </Pressable>
   
      <Text style={styles.skip}>Skip</Text>

      {profileImage ? <Text onPress={uploadProfileImage} style={[styles.skip, { backgroundColor: "green", color: "white", borderRadius: 8 }]}>Upload</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  uploadImage: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    overflow: "hidden"
  },

  skip: {
    textAlign: "center",
    padding: 10,
    textTransform: "capitalize",
    opacity: 0.5,
  },
});

export default SignatureVerification;
