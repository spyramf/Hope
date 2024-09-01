import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, Dimensions, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Padding, Color, Border, FontFamily, } from "../../GlobalStyles";
import FundComponent from "../../components/MultiUseApp/FundComponent";
import client from "../../api/client";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;






const FindFunds = (props) => {
  const navigation = useNavigation();




  const [allUserData, setAllUserData] = useState('')





  const getData = async () => {


    const res = await client.get('/get-name')

    let data = res.data[111].SchemeName

    setAllUserData(res.data)

    console.log(data)

  }



  useEffect(() => {
    getData();
  }, []);


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










      {/* <View style={styles.frameParent2}>

        <Pressable style={styles.pageTitleWrapper}>
          <Text style={[styles.pageTitle]}>All Funds</Text>
        </Pressable>

        <Pressable style={[styles.pageSpaceBlock]}>
          <Text style={[styles.pageTitle2]}>Small Cap</Text>
        </Pressable>

        <Pressable style={[styles.pageSpaceBlock]}>
          <Text style={[styles.pageTitle2]}>Large Cap</Text>
        </Pressable>

        <Pressable style={[styles.pageSpaceBlock]}>
          <Text style={[styles.pageTitle2]}>Multi Cap</Text>
        </Pressable>


      </View> */}


      {/* <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#31A062"
        maximumTrackTintColor="#000000"
      /> */}



      
        <View>
          <FlatList
            data={allUserData}
            keyExtractor={item => item._id}
            renderItem={renderItem}
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          windowSize={21}
          />
        </View>


    </View>










  );
};

const styles = StyleSheet.create({




  frameParent2: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },

  pageTitleWrapper: {
    backgroundColor: Color.colorMediumseagreen_100,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_8xs,
    borderRadius: Border.br_3xs,
    flexDirection: "row",
  },


  pageTitle: {
    color: Color.colorWhite,
    width: 84,
    height: 22,
    fontSize: FontSize.size_lg,
    textAlign: "center",
  },

  pageSpaceBlock: {
    marginLeft: 25,
    paddingVertical: Padding.p_9xs,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_3xs,
    flexDirection: "row",
    paddingHorizontal: Padding.p_5xs,
  },
  pageTitle2: {
    width: 92,
    height: 22,
    fontSize: FontSize.size_lg,
    textAlign: "center",
    color: Color.colorSteelblue_100,
  },




});

export default FindFunds;
