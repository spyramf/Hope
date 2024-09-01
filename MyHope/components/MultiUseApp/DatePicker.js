import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLogin } from "../../contexts/LoginProvider";

const { height: screenHeight } = Dimensions.get("window");

const DatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { leftHeading, placeholder, error } = props;

  const { setDatePick } = useLogin();

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        const formattedDate = formatDate(currentDate);
        setDateOfBirth(formattedDate);
        setDatePick(formattedDate);
      }
    } else {
      toggleDatepicker();
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.Heading}>{leftHeading}</Text>
        {error ? (
          <Text style={[styles.Heading, { color: "red" }]}>{error}</Text>
        ) : null}
      </View>

      <View>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}

        {!showPicker && (
          <Pressable onPress={toggleDatepicker}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#828282"
              value={dateOfBirth}
              editable={false}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    height: screenHeight * 0.08,
    fontSize: 24,
    color: "#2e436c",
    borderWidth: 1,
    borderColor: "#2e436c",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: screenHeight * 0.01,
  },
  Heading: {
    fontSize: 16,
    color: "#2e436c",
    fontWeight: "500",
    lineHeight: screenHeight * 0.03,
    marginTop: 10,
    marginBottom: screenHeight * 0.01,
  },
});

export default DatePicker;
