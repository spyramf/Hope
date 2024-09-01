import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [datePick, setDatePick] = useState("");
  const [pass, setPass] = useState("");
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        selectedCountry,
        setSelectedCountry,
        datePick,
        setDatePick,
        pass,
        setPass,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
