import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "../screens/OpeningPages/LandingPage";
import Home from "../screens/BottomPages/Home"
import Investment from "../screens/BottomPages/Investment";
import MobileNo from "../screens/Onboarding/MobileNo";
import Order from "../screens/BottomPages/Order";
import Account from "../screens/BottomPages/Account";
import EmailAddress from "../screens/Onboarding/EmailAddress";
import SetPassword from "../screens/Onboarding/SetPassword";
import VerifyPanManualDetails from "../screens/Onboarding/VerifyPanManualDetails";
import Login from "../screens/OpeningPages/Login";
import FindFunds from "../screens/HomeTab/FindFunds";
import SIPAmount from "../screens/HomeTab/SIPAmount";
import Gender from "../screens/Onboarding/Gender";
import TaxStatus from "../screens/Onboarding/TaxStatus";
import AnnualIncome from "../screens/Onboarding/AnnualIncome";
import PersonalDetails from "../screens/Onboarding/PersonalDetails";
import NomineeDetails from "../screens/Onboarding/NomineeDetails";
import BankDetails from "../screens/Onboarding/BankDetails";
import Profile from "../screens/AccountTab/Profile";
import Notification from "../screens/HomeTab/Notification";
import ProcessCompleted from "../screens/Onboarding/ProcessCompleted";
import AutoPay from "../screens/AccountTab/AutoPay";
import Payment from "../screens/AccountTab/Payment";
import FundPageNew from "../screens/HomeTab/FundPageNew";
import LinkBankAccount from "../screens/Onboarding/LinkBankAccount";
import Occupation from "../screens/Onboarding/Occupation";
import PoliticallyExposed from "../screens/Onboarding/PoliticallyExposed";
import ForgotPassword from "../screens/OpeningPages/ForgotPassword";
import PurchaseSIP from "../screens/HomeTab/PurchaseSIP";
import MyInvestment from "../screens/InvestmentTab/MyInvestment";
import OrderCompleted from "../screens/InvestmentTab/OrderCompleted";
import Test from "../screens/Test";
import OtpVerify from "../screens/Onboarding/OtpVerify";
import emailOtpVerify from "../screens/Onboarding/emailOtpVerify";
import DailySIP from "../screens/HomeTab/DailySIP";
import SIPWith100 from "../screens/HomeTab/SIPWith100";
import ComingSoon from "../screens/HomeTab/ComingSoon";
import TopFunds from "../screens/HomeTab/TopFunds";
import SIPWith500 from "../screens/HomeTab/SIPWith500";
import SmallCap from "../screens/HomeTab/SmallCap";
import ELSS from "../screens/HomeTab/ELSS";
import LargeCap from "../screens/HomeTab/LargeCap";
import Gold from "../screens/HomeTab/Gold";
import MidCap from "../screens/HomeTab/MidCap";
import Debt from "../screens/HomeTab/Debt";
import Thematic from "../screens/HomeTab/Thematic";
import Hybrid from "../screens/HomeTab/Hybrid";
import HelpAndSupport from "../screens/AccountTab/HelpAndSupport";




const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Investment" component={Investment} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Verify Mobile" component={MobileNo} />
      <Stack.Screen name="EmailAddress" component={EmailAddress} />
      <Stack.Screen name="Set Password" component={SetPassword} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen
        name="VerifyPanManualDetails"
        component={VerifyPanManualDetails}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Find Funds" component={FindFunds} />
      <Stack.Screen name="SIPAmount" component={SIPAmount} />
      <Stack.Screen name="TaxStatus" component={TaxStatus} />
      <Stack.Screen name="AnnualIncome" component={AnnualIncome} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="NomineeDetails" component={NomineeDetails} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ProcessCompleted" component={ProcessCompleted} />
      <Stack.Screen name="AutoPay" component={AutoPay} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="FundPageNew" component={FundPageNew} />
      <Stack.Screen name="LinkBankAccount" component={LinkBankAccount} />
      <Stack.Screen name="Occupation" component={Occupation} />
      <Stack.Screen name="PoliticallyExposed" component={PoliticallyExposed} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PurchaseSIP" component={PurchaseSIP} />
      <Stack.Screen name="MyInvestment" component={MyInvestment} />
      <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
      <Stack.Screen name="OTP Verification" component={OtpVerify} />
      <Stack.Screen name="Email OTP Verification" component={emailOtpVerify} />
      <Stack.Screen name="Start Daily SIP" component={DailySIP} />
      <Stack.Screen name="Start SIP With 100" component={SIPWith100} />
      <Stack.Screen name="Start SIP With 500" component={SIPWith500} />
      <Stack.Screen name="Top Funds" component={TopFunds} />
      <Stack.Screen name="Coming Soon" component={ComingSoon} />
      <Stack.Screen name="SmallCap Funds" component={SmallCap} />
      <Stack.Screen name="Tax Saver Funds" component={ELSS} />
      <Stack.Screen name="Gold Funds" component={LargeCap} />
      <Stack.Screen name="LargeCap Funds" component={Gold} />
      <Stack.Screen name="MidCap Funds" component={MidCap} />
      <Stack.Screen name="Debt Funds" component={Debt} />
      <Stack.Screen name="Thematic Funds" component={Thematic} />
      <Stack.Screen name="Hybrid Funds" component={Hybrid} />
      <Stack.Screen name="Help And Support" component={HelpAndSupport} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
}
export default StackNavigation