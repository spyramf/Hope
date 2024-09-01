import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const OneTimePay = ({ style }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.investment, style, styles.investmentLayout]}>
      <View style={[styles.investmentInner, styles.investmentLayout]}>
        <View style={styles.frameParent}>
          <View style={styles.frameGroup}>
            <View style={styles.timeWrapper}>
              <Text style={styles.time}>9:41</Text>
            </View>
            <View style={styles.frameContainer}>
              <View style={styles.cellularConnectionWrapper}>
                <Image
                  style={styles.cellularConnectionIcon}
                  contentFit="cover"
                  source={require("../assets/cellular-connection.png")}
                />
              </View>
              <Image
                style={styles.frameChild}
                contentFit="cover"
                source={require("../assets/frame-751.png")}
              />
              <View style={styles.battery}>
                <View style={[styles.border, styles.borderBorder]} />
                <Image
                  style={styles.capIcon}
                  contentFit="cover"
                  source={require("../assets/cap.png")}
                />
                <View style={styles.capacity} />
              </View>
            </View>
          </View>
          <View style={styles.frameView}>
            <View style={styles.frameParent}>
              <View>
                <View style={styles.frameParent}>
                  <View>
                    <View style={styles.frameGroup}>
                      <Text style={[styles.pageTitle, styles.pageTypo5]}>
                        Investments
                      </Text>
                    </View>
                    <View style={styles.vectorWrapper}>
                      <Image
                        style={styles.frameItem}
                        contentFit="cover"
                        source={require("../assets/line-2001.png")}
                      />
                    </View>
                  </View>
                  <View style={styles.frameParent4}>
                    <Pressable
                      style={[styles.pageTitleContainer, styles.pageFlexBox]}
                    >
                      <Text style={[styles.pageTitle1, styles.pageTypo4]}>
                        My App
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.pageTitleFrame, styles.pageFlexBox]}
                    >
                      <Text style={[styles.pageTitle2, styles.pageTypo4]}>
                        All
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <LinearGradient
                style={[styles.frameLineargradient, styles.frameLayout]}
                locations={[0, 1]}
                colors={["#e7e7e7", "rgba(255, 255, 255, 0)"]}
              >
                <View style={styles.frameParent5}>
                  <View>
                    <View>
                      <Text style={[styles.pageTitle3, styles.pageLayout]}>
                        Current Value
                      </Text>
                      <Text style={[styles.pageTitle4, styles.pageTypo3]}>
                        22,253
                      </Text>
                    </View>
                    <View style={styles.pageTitleGroup}>
                      <Text style={styles.pageTitle5}>Return</Text>
                      <Text style={[styles.pageTitle6, styles.pageTypo5]}>
                        4,253
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameParent7}>
                    <View style={styles.pageTitleParent1}>
                      <Text style={[styles.pageTitle7, styles.pageLayout]}>
                        Total Invested
                      </Text>
                      <Text style={[styles.pageTitle8, styles.pageTypo3]}>
                        18,000
                      </Text>
                    </View>
                    <View style={styles.pageTitleParent2}>
                      <Text style={styles.pageTitle9}>Returns %</Text>
                      <Text style={[styles.pageTitle10, styles.pageTypo2]}>
                        40.35 %
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
              <Pressable
                style={[styles.framePressable, styles.frameLayout]}
                onPress={() => navigation.navigate("MyApp")}
              >
                <View style={styles.frameGroup}>
                  <Text
                    style={[styles.pageTitle11, styles.pageClr]}
                  >{`SBI Small Cap- Growth  -Pradeep Gangurde  `}</Text>
                  <Image
                    style={styles.vectorIcon}
                    contentFit="cover"
                    source={require("../assets/vector9.png")}
                  />
                </View>
                <View style={styles.frameParent8}>
                  <View>
                    <Text style={[styles.pageTitle12, styles.pageTypo1]}>
                      Current Value
                    </Text>
                    <Text style={[styles.pageTitle13, styles.pageTypo]}>
                      40.35 %
                    </Text>
                  </View>
                  <View style={styles.pageTitleParent5}>
                    <Text style={[styles.pageTitle14, styles.pageTypo1]}>
                      Invested
                    </Text>
                    <Text style={[styles.pageTitle15, styles.pageTypo2]}>
                      22,253
                    </Text>
                  </View>
                  <View style={styles.pageTitleParent5}>
                    <Text style={[styles.pageTitle16, styles.pageTypo1]}>
                      Return
                    </Text>
                    <Text style={[styles.pageTitle17, styles.pageTypo]}>
                      40.35 %
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
            <View style={styles.bottom}>
              <View style={styles.frameParent5}>
                <View style={styles.home}>
                  <Image
                    style={styles.iconlyboldhome}
                    contentFit="cover"
                    source={require("../assets/iconlyboldhome2.png")}
                  />
                  <Text style={[styles.pageTitle18, styles.pageTypo2]}>
                    Home
                  </Text>
                </View>
                <View style={styles.accountSpaceBlock}>
                  <Image
                    style={styles.iconlyboldhome}
                    contentFit="cover"
                    source={require("../assets/iconlylightsearch2.png")}
                  />
                  <Text style={[styles.pageTitle19, styles.pageTypo5]}>
                    Investment
                  </Text>
                </View>
                <View style={styles.accountSpaceBlock}>
                  <Image
                    style={styles.shapeIcon}
                    contentFit="cover"
                    source={require("../assets/shape2.png")}
                  />
                  <Text style={[styles.pageTitle20, styles.account1Typo]}>
                    Order
                  </Text>
                </View>
                <View style={[styles.account, styles.accountSpaceBlock]}>
                  <Image
                    style={styles.iconlyboldprofile}
                    contentFit="cover"
                    source={require("../assets/iconlyboldprofile2.png")}
                  />
                  <Text style={[styles.account1, styles.account1Typo]}>
                    Account
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  investmentLayout: {
    height: 926,
    flexDirection: 'row',
    width: screenWidth,
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  pageTypo5: {
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
  },
  pageFlexBox: {
    paddingVertical: Padding.p_sm,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pageTypo4: {
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.dMSansBold,
    textAlign: "center",
    fontWeight: "700",
  },
  frameLayout: {
    borderRadius: Border.br_8xs,
    marginTop: 33,
  },
  pageLayout: {
    width: 119,
    height: 22,
    display: "flex",
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_lg,
    color: Color.colorSteelblue_100,
    alignItems: "center",
  },
  pageTypo3: {
    marginTop: 10,
    fontSize: FontSize.size_base,
    width: 97,
    height: 22,
    display: "flex",
    color: Color.colorSteelblue_100,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    alignItems: "center",
  },
  pageTypo2: {
    marginTop: 2,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
  },
  pageClr: {
    display: "flex",
    color: Color.colorSteelblue_100,
    alignItems: "center",
  },
  pageTypo1: {
    fontSize: FontSize.size_sm,
    height: 20,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorSteelblue_100,
  },
  pageTypo: {
    marginTop: 4,
    height: 20,
    color: Color.colorMediumseagreen_100,
    fontSize: FontSize.size_smi,
    width: 97,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
  },
  account1Typo: {
    marginTop: 5,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.dMSansBold,
    textAlign: "center",
    fontWeight: "700",
  },
  accountSpaceBlock: {
    marginLeft: 36,
    height: 42,
    alignItems: "center",
  },
  time: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    fontFamily: FontFamily.robotoCondensedBold,
    color: Color.black,
    textAlign: "center",
    fontWeight: "700",
  },
  timeWrapper: {
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  cellularConnectionWrapper: {
    width: 37,
    height: 31,
  },
  frameChild: {
    width: 35,
    height: 31,
  },
  border: {
    top: 0,
    left: 0,
    borderRadius: 3,
    borderColor: Color.black,
    opacity: 0.35,
    width: 22,
    position: "absolute",
    height: 11,
  },
  capIcon: {
    top: 4,
    left: 23,
    width: 1,
    height: 4,
    opacity: 0.4,
    position: "absolute",
  },
  capacity: {
    marginTop: -3.65,
    top: "50%",
    right: 4,
    borderRadius: 1,
    backgroundColor: Color.black,
    height: 7,
    width: 18,
    position: "absolute",
  },
  battery: {
    width: 24,
    height: 11,
  },
  frameContainer: {
    marginLeft: 254,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  frameGroup: {
    alignItems: "center",
    flexDirection: "row",
  },
  pageTitle: {
    fontSize: FontSize.size_15xl,
    width: 247,
    textAlign: "left",
    color: Color.colorSteelblue_100,
  },
  frameItem: {
    maxHeight: "100%",
    width: 414,
    opacity: 0.5,
  },
  vectorWrapper: {
    height: 0,
    marginTop: 11,
  },
  pageTitle1: {
    color: Color.colorWhite,
  },
  pageTitleContainer: {
    backgroundColor: Color.colorMediumseagreen_100,
    width: 170,
    paddingHorizontal: Padding.p_6xs,
  },
  pageTitle2: {
    color: Color.colorSteelblue_100,
  },
  pageTitleFrame: {
    backgroundColor: Color.colorGainsboro_100,
    width: 172,
    paddingHorizontal: Padding.p_9xs,
    marginLeft: 45,
  },
  frameParent4: {
    width: 387,
    marginTop: 27,
    flexDirection: "row",
  },
  frameParent: {
    alignItems: "center",
  },
  pageTitle3: {
    height: 22,
    textAlign: "left",
  },
  pageTitle4: {
    textAlign: "left",
  },
  pageTitle5: {
    fontSize: FontSize.size_smi,
    width: 97,
    height: 22,
    fontFamily: FontFamily.dMSansRegular,
    textAlign: "left",
    color: Color.colorSteelblue_100,
  },
  pageTitle6: {
    color: Color.colorMediumseagreen_100,
    fontSize: FontSize.size_smi,
    width: 97,
    height: 22,
    textAlign: "left",
  },
  pageTitleGroup: {
    marginTop: 31,
  },
  pageTitle7: {
    textAlign: "right",
    height: 22,
  },
  pageTitle8: {
    textAlign: "right",
  },
  pageTitleParent1: {
    alignItems: "flex-end",
  },
  pageTitle9: {
    textAlign: "right",
    fontSize: FontSize.size_smi,
    width: 97,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorSteelblue_100,
  },
  pageTitle10: {
    textAlign: "right",
    color: Color.colorMediumseagreen_100,
    width: 97,
    height: 22,
  },
  pageTitleParent2: {
    marginTop: 33,
  },
  frameParent7: {
    marginLeft: 115,
    alignItems: "flex-end",
  },
  frameParent5: {
    flexDirection: "row",
  },
  frameLineargradient: {
    width: 395,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_5xs,
    backgroundColor: "transparent",
    marginTop: 33,
  },
  pageTitle11: {
    width: 356,
    height: 69,
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_lg,
    display: "flex",
    textAlign: "left",
  },
  vectorIcon: {
    width: 7,
    height: 12,
    marginLeft: 4,
  },
  pageTitle12: {
    width: 124,
    height: 20,
    textAlign: "left",
  },
  pageTitle13: {
    textAlign: "left",
  },
  pageTitle14: {
    height: 20,
    width: 97,
    textAlign: "center",
  },
  pageTitle15: {
    width: 97,
    height: 22,
    display: "flex",
    color: Color.colorSteelblue_100,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  pageTitleParent5: {
    marginLeft: 25,
  },
  pageTitle16: {
    height: 20,
    textAlign: "right",
    width: 97,
  },
  pageTitle17: {
    textAlign: "right",
  },
  frameParent8: {
    width: 368,
    marginTop: 18,
    flexDirection: "row",
  },
  framePressable: {
    borderColor: Color.colorSteelblue_100,
    paddingHorizontal: 14,
    paddingVertical: Padding.p_6xs,
    marginTop: 33,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  iconlyboldhome: {
    height: 22,
    width: 22,
  },
  pageTitle18: {
    width: 44,
    height: 15,
    color: Color.colorSteelblue_100,
    textAlign: "center",
  },
  home: {
    width: 52,
    height: 42,
    alignItems: "center",
  },
  pageTitle19: {
    width: 73,
    height: 17,
    marginTop: 3,
    fontSize: FontSize.size_smi,
    color: Color.colorSteelblue_100,
    textAlign: "center",
  },
  shapeIcon: {
    width: 25,
    height: 23,
    opacity: 0.5,
  },
  pageTitle20: {
    width: 77,
    height: 16,
    color: Color.colorSteelblue_100,
  },
  iconlyboldprofile: {
    height: 20,
    width: 18,
  },
  account1: {
    width: 59,
    height: 13,
    color: Color.colorMediumseagreen_100,
  },
  account: {
    width: 62,
  },
  bottom: {
    backgroundColor: Color.colorSteelblue_200,
    height: 99,
    paddingHorizontal: Padding.p_2xl,
    paddingVertical: Padding.p_4xl,
    marginTop: 265,
    width: 428,
  },
  frameView: {
    marginTop: 29,
    alignItems: "center",
  },
  investmentInner: {
    flexDirection: "row",
  },
  investment: {
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
  },
});

export default OneTimePay;
