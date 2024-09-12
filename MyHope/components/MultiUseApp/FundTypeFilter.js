import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontSize, Padding, Color, Border } from "../../GlobalStyles";
import FundComponent from "./FundComponent";
import client from "../../api/client";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FundTypeFilter = ({ filterCondition }) => {
  const [allUserData, setAllUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await client.get("/get-name");
      const data = res.data;
      setAllUserData(data);
      // Apply the passed filtering condition
      const filteredByAmount = data.filter(filterCondition);
      setFilteredData(filteredByAmount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [filterCondition]); // Use filterCondition as a dependency

  useEffect(() => {
    // Filter data based on search query
    const results = allUserData.filter((item) =>
      item.SchemeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
  }, [searchQuery, allUserData]); // Corrected dependencies

  const renderItem = ({ item }) => (
    <FundComponent
      data={item}
      fundName={item.SchemeName}
      fundType={item.MainType}
      fundSubType={item.SubType}
      logo={{ uri: item.Logo }}
      oneYear="43%"
    />
  );

  const ITEM_HEIGHT = 80;
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search funds..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Color.colorSteelblue_100}
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          windowSize={21}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Padding.p_3xs,
  },
  header: {
    padding: 10,
  },
  searchBar: {
    height: 50,
    borderColor: "#2E436C",
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xs,
    fontSize: FontSize.size_sm,
    backgroundColor: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FundTypeFilter;
