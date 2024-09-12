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

const SIPDropdown = (props) => {
  const { SIPdata, leftHeading, error } = props;

  const countries = SIPdata;

  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(countries);
  const { country, setCountry } = useLogin("");
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

        {error ? (
          <Text
            style={
              ({
                fontSize: 16,
                color: "#2e436c",
                fontWeight: "500",
                lineHeight: screenHeight * 0.03,
                marginTop: 10,
                marginBottom: screenHeight * 0.01,
              },
              { color: "red" })
            }
          >
            {error}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          marginBottom: screenHeight * 0.015,
        }}
      >
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
          <View>
            <View
              style={{
                elevation: 5,
                marginTop: 20,
                height: 300,
                alignSelf: "center",
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 20,
                paddingHorizontal: 12,
                borderColor: "#2e436c",
                zIndex: 10, // Ensure dropdown is above other components
                elevation: 5,
                position: "absolute", // Adds shadow effect for better visibility
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
                        setSelectedCountry(item.country);
                        setCountry(item.code);
                        setClicked(!clicked);
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>{item.country}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SIPDropdown;
