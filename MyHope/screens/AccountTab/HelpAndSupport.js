import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const HelpAndSupport = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Help & Support</Text>

      {/* Common Issues Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Issues</Text>
        <Text style={styles.infoText}>
          - Login Issues: Having trouble logging into your account? Follow these
          steps...
        </Text>
        <Text style={styles.infoText}>
          - Transaction Issues: Unable to complete a transaction? Check the
          common solutions...
        </Text>
        <Text style={styles.infoText}>
          - Account Setup: Get help setting up your account and linking your
          bank details...
        </Text>
      </View>

      {/* Contact Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.infoText}>- Email: support@moneybharat.net</Text>
        <Text style={styles.infoText}>- Phone: +91-9970735694</Text>
        <Text style={styles.infoText}>
          - Working Hours: 9 AM - 6 PM, Monday - Saturday
        </Text>
      </View>

      {/* Live Chat Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Chat</Text>
        <Text style={styles.infoText}>
          You can contact us via live chat during working hours to get instant
          assistance.
        </Text>
      </View>

      {/* User Guide Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Guide</Text>
        <Text style={styles.infoText}>
          - How to Register: Step-by-step guide to register for Money Bharat
          services...
        </Text>
        <Text style={styles.infoText}>
          - How to Link Bank Account: Follow these instructions to link your
          bank account...
        </Text>
        <Text style={styles.infoText}>
          - How to Set Up SIP: Learn how to set up a Systematic Investment Plan
          (SIP)...
        </Text>
      </View>

      {/* Feedback Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Feedback</Text>
        <Text style={styles.infoText}>
          We value your feedback! Please email us your thoughts and suggestions
          at support@moneybharat.com.
        </Text>
      </View>

      {/* Terms and Conditions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Terms and Conditions</Text>
        <Text style={styles.infoText}>
          Read the full terms and conditions for using Money Bharat services on
          our website.
        </Text>
      </View>

      {/* Privacy Policy Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <Text style={styles.infoText}>
          We are committed to protecting your privacy. Read our privacy policy
          for more information.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
});

export default HelpAndSupport;
