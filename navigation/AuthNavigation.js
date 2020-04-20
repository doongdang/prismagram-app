import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "../screens/Auth/SignUp";
import Confirm from "../screens/Auth/Confirm";
import AuthHome from "../screens/Auth/AuthHome";
import LogIn from "../screens/Auth/LogIn";

const AuthNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <AuthNavigation.Navigator initialRouteName="AuthHome" headerMode="none">
        <AuthNavigation.Screen
          name="AuthHome"
          component={AuthHome}
        ></AuthNavigation.Screen>
        <AuthNavigation.Screen
          name="SignUp"
          component={SignUp}
        ></AuthNavigation.Screen>
        <AuthNavigation.Screen
          name="Confirm"
          component={Confirm}
        ></AuthNavigation.Screen>
        <AuthNavigation.Screen
          name="LogIn"
          component={LogIn}
        ></AuthNavigation.Screen>
      </AuthNavigation.Navigator>
    </NavigationContainer>
  );
};
