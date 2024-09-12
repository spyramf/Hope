import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [datePick, setDatePick] = useState("");
  const [pass, setPass] = useState("");
  const [country, setCountry] = useState("");
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
        country,
        setCountry,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
