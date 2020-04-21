import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";

import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator>
      <TabNavigation.Screen name="Home" component={Home}></TabNavigation.Screen>
      <TabNavigation.Screen
        name="Search"
        component={Search}
      ></TabNavigation.Screen>
      <TabNavigation.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })} //아마도 screen 내부에서 Event Handle 하려면 prop으로 Listener 줘야하는듯
      ></TabNavigation.Screen>
      <TabNavigation.Screen
        name="Notification"
        component={Notification}
      ></TabNavigation.Screen>
      <TabNavigation.Screen
        name="Profile"
        component={Profile}
      ></TabNavigation.Screen>
    </TabNavigation.Navigator>
  );
};
