import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigation from "./Navigation/StackNavigation";
import LoginProvider from "./contexts/LoginProvider";

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </LoginProvider>
  );
}


