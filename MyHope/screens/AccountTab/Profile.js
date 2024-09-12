import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect } from "react";
import UnEditAble from "../../components/AccountComponent/UnEditAble";
import { useLogin } from "../../contexts/LoginProvider";
import { ScrollView } from "react-native-gesture-handler";
import UnEditInLine from "../../components/AccountComponent/UnEditInLine";

const Profile = () => {
  const { profile } = useLogin();

  useEffect(() => {
    if (!profile || !profile.user) {
      Alert.alert("Error", "User profile data is missing.");
    }
  }, [profile]);

  const renderSection = (title, children) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
      <View style={styles.sectionDivider} />
    </>
  );

  const renderRow = (left, right) => (
    <View style={styles.row}>
      {left}
      {right}
    </View>
  );

  if (!profile || !profile.user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to load profile data.</Text>
      </View>
    );
  }

  const {
    firstName,
    lastName,
    mobile,
    state,
    city,
    pin,
    email,
    pan,
    dob,
    ifsc,
    accType,
    bankName,
    accNo,
    n_name,
    n_relation,
  } = profile.user;

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderSection(
          "Personal Details",
          <>
            {renderRow(
              <UnEditAble
                leftHeading="First Name"
                rightHeading={firstName || "N/A"}
              />,
              <UnEditAble
                leftHeading="Last Name"
                rightHeading={lastName || "N/A"}
              />
            )}
            {renderRow(
              <UnEditAble
                leftHeading="Mobile Number"
                rightHeading={mobile || "N/A"}
              />,
              <UnEditAble leftHeading="State" rightHeading={state || "N/A"} />
            )}
            {renderRow(
              <UnEditAble leftHeading="City" rightHeading={city || "N/A"} />,
              <UnEditAble leftHeading="PIN" rightHeading={pin || "N/A"} />
            )}
            <UnEditInLine
              leftHeading="Email ID"
              rightHeading={email || "N/A"}
            />
          </>
        )}

        {renderSection(
          "KYC Details",
          renderRow(
            <UnEditAble leftHeading="PAN" rightHeading={pan || "N/A"} />,
            <UnEditAble
              leftHeading="Date of Birth"
              rightHeading={dob || "N/A"}
            />
          )
        )}

        {renderSection(
          "Bank Details",
          <>
            {renderRow(
              <UnEditAble
                leftHeading="IFSC Code"
                rightHeading={ifsc || "N/A"}
              />,
              <UnEditAble
                leftHeading="Account Type"
                rightHeading={accType || "N/A"}
              />
            )}
            <UnEditInLine
              leftHeading="Bank Name"
              rightHeading={bankName || "N/A"}
            />
            <UnEditInLine
              leftHeading="Account Number"
              rightHeading={accNo || "N/A"}
            />
          </>
        )}

        {renderSection(
          "Nominee Details",
          <>
            <UnEditInLine
              leftHeading="Nominee Name"
              rightHeading={n_name || "N/A"}
            />
            {renderRow(
              <UnEditAble
                leftHeading="Nominee Relation"
                rightHeading={n_relation || "N/A"}
              />,
              <UnEditAble leftHeading="Percentage" rightHeading="100%" />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    bottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    margin: 10,
    marginTop: 20,
    fontWeight: "700",
    color: "#2E436C",
  },
  sectionDivider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    borderStyle: "dashed",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Profile;
