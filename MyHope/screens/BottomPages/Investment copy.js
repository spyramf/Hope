import { View, Text, ScrollView, Dimensions } from "react-native";
import React from 'react'
import InvestmentComponent from '../../components/InvestmentComponent/InvestmentComponent'
import TotalInvestmentComponent from '../../components/InvestmentComponent/TotalInvestmentComponent';
import Layout from '../../components/Layout/Layout';
const { height } = Dimensions.get("window");
const Investment = () => {
  return (
    <Layout>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ marginBottom: height * 0.1 }}>
          <TotalInvestmentComponent />
          <InvestmentComponent fundName="SBI Small Cap Mutual Fund" />
          <InvestmentComponent fundName="SBI Small Cap Mutual Fund" />
          <InvestmentComponent fundName="SBI Small Cap Mutual Fund" />
          <InvestmentComponent fundName="SBI Small Cap Mutual Fund" />
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Investment