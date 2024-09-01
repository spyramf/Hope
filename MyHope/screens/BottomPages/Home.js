import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import Banner from "../../components/HomeComponent/Banner.js";
import Layout from "../../components/Layout/Layout.js";
import Trending from "../../components/HomeComponent/Trending.js";
import FundComponent from "../../components/MultiUseApp/FundComponent.js";
import FundTypes from "../../components/HomeComponent/FundTypes.js";
import HomeHeader from "../../components/HomeComponent/HomeHeader.js";
import RecommendedFund from "../../components/HomeComponent/RecommendedFund.js";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const Home = () => {
  return (
    <Layout>
      <View>
        <HomeHeader />

        <ScrollView
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ marginBottom: height * 0.18 }}>
            <View style={{ padding: width * 0.01 }}>
          
            </View>
<Banner/>
            <Trending
              firstLogo={require("../AppImage/HomeImage/Light/Daily_L.png")}
              firstLine="Daily SIP"
              secondLogo={require("../AppImage/HomeImage/Light/Rs100L.png")}
              secondLine="₹100 SIP"
              thirdLogo={require("../AppImage/HomeImage/Light/TopFundL.png")}
              thirdLine="Top Funds"
              fourthLogo={require("../AppImage/HomeImage/Light/FindFundL.png")}
              fourthLine="Find Funds"
            />

            <RecommendedFund />

            <Trending
              firstLogo={require("../AppImage/HomeImage/Light/calculator_L.png")}
              firstLine="SIP Calculator"
              secondLogo={require("../AppImage/HomeImage/Light/500_L.png")}
              secondLine="₹500 SIP"
              thirdLogo={require("../AppImage/HomeImage/Light/nfo_L.png")}
              thirdLine="NFO"
              fourthLogo={require("../AppImage/HomeImage/Light/pick_L.png")}
              fourthLine="Funds Picks"
            />

            <FundTypes
              firstLogo={require("../AppImage/HomeImage/Light/SmallCapL.png")}
              firstLine="Small Cap"
              secondLogo={require("../AppImage/HomeImage/Light/TaxL.png")}
              secondLine="ELSS"
              thirdLogo={require("../AppImage/HomeImage/Light/LargeCapL.png")}
              thirdLine="Large Cap"
              fourthLogo={require("../AppImage/HomeImage/Light/GoldL.png")}
              fourthLine="Gold "
              firstLogos={require("../AppImage/HomeImage/Light/MidCapL.png")}
              firstLines="Mid Cap"
              secondLogos={require("../AppImage/HomeImage/Light/DebtL.png")}
              secondLines="Debt"
              thirdLogos={require("../AppImage/HomeImage/Light/ThematicL.png")}
              thirdLines="Thematic"
              fourthLogos={require("../AppImage/HomeImage/Light/HybridL.png")}
              fourthLines="Hybrid"
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({});

export default Home;
