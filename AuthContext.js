import React, { useContext, createContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const logUserIn = async (token) => {
    console.log(token);
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  }; // logUserIn 호출시 AsyncStorage 내부의 isLoggedIn에게 true 전달 이후 isloggedIn State를 True로 변환

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  ); // value안에 넣은값은 다른곳에서 밑에서 선언한 함수를 통해 사용가능하게 된다.
}; // AuthProvider 안에 넣는 모든 Component는 AuthContext.Provider 태그로 싸이게 된다.

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);

  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);

  return logUserOut;
};
//위의 3개의 함수가 의미하는 바는 각각의 함수가 호출되었을때 {} 안에 있는 함수를 호출하여 실행한후 그 결과값을 반환하는 것이다.
