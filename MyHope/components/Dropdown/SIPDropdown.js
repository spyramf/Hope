import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { useLogin } from "../../contexts/LoginProvider";
import React, { useState, useEffect } from "react";
import { SIPdata } from "./Dropdown data/DropdownData";

const { height: screenHeight } = Dimensions.get("window");

const SIPDropdown = props => {

  const { SIPdata, leftHeading } = props;

  const countries = SIPdata;




  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(countries);

  const { selectedCountry, setSelectedCountry } = useLogin("");

  useEffect(() => {
    setData(countries);
  }, []);

  useEffect(() => {
    setSelectedCountry(selectedCountry);
  }, [selectedCountry]);


  
  //  console.log(selectedCountry);

  // console.log(clicked);
  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          color: "#2e436c",
          fontWeight: "500",
          marginTop: 10,

        }}
      >
        {leftHeading}
      </Text>
      <View    style={{
            marginBottom: screenHeight * 0.01,}}>
        <TouchableOpacity
          style={{
            height: screenHeight * 0.08,
            width: "100%",
            borderRadius: 20,
            borderWidth: 1,
            alignSelf: "center",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 15,
            paddingRight: 15,
            paddingHorizontal: 12,
            color: "#2e436c",
            borderColor: "#2e436c",
          }}
          onPress={() => {
            setClicked(!clicked);
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 24, color: "#2e436c" }}>
            {selectedCountry == "" ? "Select Your Option" : selectedCountry}
          </Text>
          {clicked ? (
            <Image
              source={require("../../screens/AppImage/upload.png")}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Image
              source={require("../../screens/AppImage/dropdown.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
        </TouchableOpacity>
        {clicked ? (
          <View
            style={{
              elevation: 5,
              marginTop: 20,
              height: 100,
              alignSelf: "center",
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 20,
              paddingHorizontal: 12,
              borderColor: "#2e436c",
            }}
          >
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      height: 50,
                      justifyContent: "center",
                      borderBottomWidth: 0.5,
                      borderColor: "#2e436c",
                    }}
                    onPress={() => {
                      setSelectedCountry(item.code);

                      setClicked(!clicked);
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>{item.country}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SIPDropdown;
