import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import React, { useEffect , useState } from "react";
import Banner from "../../components/HomeComponent/Banner.js";
import Layout from "../../components/Layout/Layout.js";
import Trending from "../../components/HomeComponent/Trending.js";
import RecommendedFund from "../../components/HomeComponent/RecommendedFund.js";
import FundTypes from "../../components/HomeComponent/FundTypes.js";
import HomeHeader from "../../components/HomeComponent/HomeHeader.js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation();
  const [headerData, setHeaderData] = useState();
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const Log = await AsyncStorage.getItem("LoginData");
        if (Log) {
          const parsedLog = JSON.parse(Log);
          const lastName = parsedLog.user.lastName;
               const firstName = parsedLog.user.firstName;
                 const city = parsedLog.user.city;
const headerData = { lastName, firstName, city };
setHeaderData(headerData);
          console.log(headerData); // This will log only once
        }
      } catch (error) {
        console.error("Failed to retrieve login data", error);
      }
    };

    // Call the function to log data once
    fetchLoginData();
  }, []);





  // Function to handle navigation
  const handleNavigate = (route) => {
    navigation.navigate(route);
  };






  
  const fundTypesData = {
    firstRow: [
      {
        logo: require("../AppImage/HomeImage/Light/SmallCapL.png"),
        line: "Small Cap",
      },
      { logo: require("../AppImage/HomeImage/Light/TaxL.png"), line: "ELSS" },
      {
        logo: require("../AppImage/HomeImage/Light/LargeCapL.png"),
        line: "Large Cap",
      },
      { logo: require("../AppImage/HomeImage/Light/GoldL.png"), line: "Gold" },
    ],
    secondRow: [
      {
        logo: require("../AppImage/HomeImage/Light/MidCapL.png"),
        line: "Mid Cap",
      },
      { logo: require("../AppImage/HomeImage/Light/DebtL.png"), line: "Debt" },
      {
        logo: require("../AppImage/HomeImage/Light/ThematicL.png"),
        line: "Thematic",
      },
      {
        logo: require("../AppImage/HomeImage/Light/HybridL.png"),
        line: "Hybrid",
      },
    ],
  };

  const trendingData = [
    {
      firstLogo: require("../AppImage/HomeImage/Light/Daily_L.png"),
      firstLine: "Daily SIP",
      firstHandelSubmit: () => handleNavigate("Start Daily SIP"),
      secondLogo: require("../AppImage/HomeImage/Light/Rs100L.png"),
      secondLine: "₹100 SIP",
      secondHandelSubmit: () => handleNavigate("Start SIP With 100"),
      thirdLogo: require("../AppImage/HomeImage/Light/TopFundL.png"),
      thirdLine: "Top Funds",
      thirdHandelSubmit: () => handleNavigate("Top Funds"),
      fourthLogo: require("../AppImage/HomeImage/Light/FindFundL.png"),
      fourthLine: "Find Funds",
      fourthHandelSubmit: () => handleNavigate("Find Funds"),
    },
    {
      firstLogo: require("../AppImage/HomeImage/Light/calculator_L.png"),
      firstLine: "SIP Calculator",
      firstHandelSubmit: () => handleNavigate("Coming Soon"),
      secondLogo: require("../AppImage/HomeImage/Light/500_L.png"),
      secondLine: "₹500 SIP",
      secondHandelSubmit: () => handleNavigate("Start SIP With 500"),
      thirdLogo: require("../AppImage/HomeImage/Light/nfo_L.png"),
      thirdLine: "NFO",
      thirdHandelSubmit: () => handleNavigate("Coming Soon"),
      fourthLogo: require("../AppImage/HomeImage/Light/pick_L.png"),
      fourthLine: "Funds Picks",
      fourthHandelSubmit: () => handleNavigate("Coming Soon"),
    },
  ];

  return (
    <Layout>
      <View>
        <HomeHeader
          Name={
            headerData?.firstName && headerData?.lastName
              ? `${headerData.firstName} ${headerData.lastName}`
              : "Unknown Name"
          }
          City={headerData?.city || "Unknown City"}
        />

        <ScrollView
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.scrollContainer}>
            <Banner />
            {trendingData.map((trendingItem, index) => (
              <Trending
                key={index}
                firstLogo={trendingItem.firstLogo}
                firstLine={trendingItem.firstLine}
                firstHandelSubmit={trendingItem.firstHandelSubmit}
                secondLogo={trendingItem.secondLogo}
                secondLine={trendingItem.secondLine}
                secondHandelSubmit={trendingItem.secondHandelSubmit}
                thirdLogo={trendingItem.thirdLogo}
                thirdLine={trendingItem.thirdLine}
                thirdHandelSubmit={trendingItem.thirdHandelSubmit}
                fourthLogo={trendingItem.fourthLogo}
                fourthLine={trendingItem.fourthLine}
                fourthHandelSubmit={trendingItem.fourthHandelSubmit}
              />
            ))}
            <RecommendedFund />
            <FundTypes
              firstLogo={fundTypesData.firstRow[0].logo}
              firstLine={fundTypesData.firstRow[0].line}
              secondLogo={fundTypesData.firstRow[1].logo}
              secondLine={fundTypesData.firstRow[1].line}
              thirdLogo={fundTypesData.firstRow[2].logo}
              thirdLine={fundTypesData.firstRow[2].line}
              fourthLogo={fundTypesData.firstRow[3].logo}
              fourthLine={fundTypesData.firstRow[3].line}
              firstLogos={fundTypesData.secondRow[0].logo}
              firstLines={fundTypesData.secondRow[0].line}
              secondLogos={fundTypesData.secondRow[1].logo}
              secondLines={fundTypesData.secondRow[1].line}
              thirdLogos={fundTypesData.secondRow[2].logo}
              thirdLines={fundTypesData.secondRow[2].line}
              fourthLogos={fundTypesData.secondRow[3].logo}
              fourthLines={fundTypesData.secondRow[3].line}
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: height * 0.18,
    padding: width * 0.01,
  },
});

export default Home;
