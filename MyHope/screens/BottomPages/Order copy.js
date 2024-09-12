import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import OrderComponent from '../../components/Order/OrderComponent'
import Layout from '../../components/Layout/Layout'

const Order = () => {
  return (
    <Layout>
      <ScrollView>
        <View>
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
          <OrderComponent fundName="Axis SmallCap Mutual Fund" />
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Order