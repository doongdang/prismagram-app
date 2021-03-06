import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "../screens/Auth/SignUp";
import Confirm from "../screens/Auth/Confirm";
import AuthHome from "../screens/Auth/AuthHome";
import LogIn from "../screens/Auth/LogIn";
import { CardStyleInterpolators } from "@react-navigation/stack";
import MyTheme from "./Theme";

const AuthNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigation.Navigator
        initialRouteName="AuthHome"
        headerMode="none" //최초 라우팅 연결을 이름이 "AuthHome" 인곳으로 연결
      >
        <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
        <AuthNavigation.Screen
          name="SignUp"
          component={SignUp}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} // IOS Style로 좌우 제스쳐로 변경
        />
        <AuthNavigation.Screen name="Confirm" component={Confirm} />
        <AuthNavigation.Screen
          name="LogIn"
          component={LogIn}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </AuthNavigation.Navigator>
    </NavigationContainer>
  );
};
