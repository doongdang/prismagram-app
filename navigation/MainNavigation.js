import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import MyTheme from "./Theme";

const MainNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <MainNavigation.Navigator headerMode="none">
        <MainNavigation.Screen name="TabNavigation" component={TabNavigation} />
        <MainNavigation.Screen
          name="PhotoNavigation"
          component={PhotoNavigation}
        />
        <MainNavigation.Screen
          name="MessageNavigation"
          component={MessageNavigation}
        />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};