import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UnEditAble from "../../components/AccountComponent/UnEditAble";
import { useLogin } from "../../contexts/LoginProvider";
import { ScrollView } from "react-native-gesture-handler";
import UnEditInLine from "../../components/AccountComponent/UnEditInLine";
const Profile = () => {
  const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 20,
              margin: 10,
              marginTop: 30,
              fontWeight: "700",
              color: "#2E436C",
            }}
          >
            Personal Details
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <UnEditAble
              leftHeading="First Name"
              rightHeading={profile.user.firstName}
            />
            <UnEditAble
              leftHeading="Last Name"
              rightHeading={profile.user.lastName}
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <UnEditAble
              leftHeading="Mobile Number"
              rightHeading={profile.user.mobile}
            />
            <UnEditAble leftHeading="State" rightHeading={profile.user.state} />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <UnEditAble leftHeading="City" rightHeading={profile.user.city} />
            <UnEditAble leftHeading="PIN" rightHeading={profile.user.pin} />
          </View>

          <UnEditInLine
            leftHeading="Email ID"
            rightHeading={profile.user.email}
          />

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
              borderStyle: "dashed",
              marginTop: 20,
            }}
          />

          <Text
            style={{
              fontSize: 20,
              margin: 10,
              marginTop: 20,
              fontWeight: "700",
              color: "#2E436C",
            }}
          >
            KYC Details
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <UnEditAble leftHeading="PAN" rightHeading={profile.user.pan} />
            <UnEditAble
              leftHeading="Date of Birth"
              rightHeading={profile.user.dob}
            />
          </View>

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
              borderStyle: "dashed",
              marginTop: 20,
            }}
          />

          <Text
            style={{
              fontSize: 20,
              margin: 10,
              marginTop: 20,
              fontWeight: "700",
              color: "#2E436C",
            }}
          >
            Bank Details
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <UnEditAble
              leftHeading="IFSC Code"
              rightHeading={profile.user.ifsc}
            />
            <UnEditAble
              leftHeading="Account Type"
              rightHeading={profile.user.accType}
            />
          </View>

          <UnEditInLine
            leftHeading="Bank Name"
            rightHeading={profile.user.bankName}
          />

          <UnEditInLine
            leftHeading="Account Number"
            rightHeading={profile.user.accNo}
          />

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
              borderStyle: "dashed",
              marginTop: 20,
            }}
          />

          <Text
            style={{
              fontSize: 20,
              margin: 10,
              marginTop: 20,
              fontWeight: "700",
              color: "#2E436C",
            }}
          >
            Nominee Details
          </Text>

          <UnEditInLine
            leftHeading="Nominee Name"
            rightHeading={profile.user.n_name}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <UnEditAble
              leftHeading="Nominee Relation"
              rightHeading={profile.user.n_relation}
            />
            <UnEditAble leftHeading="Percentage" rightHeading="100%" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    bottom:10
  },
});
export default Profile;
