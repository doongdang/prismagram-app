import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import "react-native-gesture-handler";
import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notification from "../screens/Tab/Notification";
import Profile from "../screens/Tab/Profile";
const StackFactory = createStackNavigator();

export const StackHome = () => {
  return (
    <StackFactory.Navigator>
      <StackFactory.Screen name="Home" component={Home} />
    </StackFactory.Navigator>
  );
};
export const StackSearch = () => {
  return (
    <StackFactory.Navigator>
      <StackFactory.Screen name="Search" component={Search} />
    </StackFactory.Navigator>
  );
};
export const StackNotification = () => {
  return (
    <StackFactory.Navigator>
      <StackFactory.Screen name="Notification" component={Notification} />
    </StackFactory.Navigator>
  );
};
export const StackProfile = () => {
  return (
    <StackFactory.Navigator>
      <StackFactory.Screen name="Profile" component={Profile} />
    </StackFactory.Navigator>
  );
};
