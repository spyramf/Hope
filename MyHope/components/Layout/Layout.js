import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from 'react'
import Header from './Header'
import Footer from './Footer'
const { height } = Dimensions.get("window");
const Layout = ({children}) => {
  return (
    <>
      <View style={{ marginBottom: height * 0.09 }}>{children}</View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  footer: {
    display: "flex",
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    zIndex: 100,
    borderTopWidth: 1,
    borderColor: "lightgray",
    position: "absolute",
    bottom: 0,
    padding: 0,
  },
});
export default Layout