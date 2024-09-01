import React from "react";
import { View, Text } from "react-native";

function Pagination({ page, pageSize }) {
  return (
    <View>
      <Text>Page: {page}</Text>
      <Text>Page Size: {pageSize}</Text>
    </View>
  );
}

Pagination.defaultProps = {
  page: 1,
  pageSize: 10,
};

export default Pagination;
