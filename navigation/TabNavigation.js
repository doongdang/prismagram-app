import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";

import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notification from "../screens/Tab/Notification";
import Profile from "../screens/Tab/Profile";
import { createStackNavigator } from "@react-navigation/stack";

const TabNavigation = createBottomTabNavigator();
const stackFactory = createStackNavigator();
const stackInsert = ({ route }) => {
  const { initialRoute, customConfig } = route.params;
  return (
    <stackFactory.Navigator>
      <stackFactory.Screen
        name={route.name}
        component={initialRoute}
        options={customConfig}
      />
    </stackFactory.Navigator>
  );
};

export default () => {
  return (
    <TabNavigation.Navigator>
      <TabNavigation.Screen
        name="Home"
        component={stackInsert}
        initialParams={{
          initialRoute: Home,
          customConfig: {
            headerTitleAlign: "center",
            headerRight: () => (
              <TouchableOpacity>
                <Text>Hello</Text>
              </TouchableOpacity>
            ),
          },
        }}
      />
      <TabNavigation.Screen
        name="Search"
        component={stackInsert}
        initialParams={{
          initialRoute: Search,
          customConfig: {
            headerTitleAlign: "center",
          },
        }}
      />
      <TabNavigation.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })} //아마도 screen 내부에서 Event Handle 하려면 prop으로 Listener 줘야하는듯
      />
      <TabNavigation.Screen
        name="Notification"
        component={stackInsert}
        initialParams={{
          initialRoute: Notification,
          customConfig: {
            headerTitleAlign: "center",
          },
        }}
      />
      <TabNavigation.Screen
        name="Profile"
        component={stackInsert}
        initialParams={{
          initialRoute: Profile,
          customConfig: {
            headerTitleAlign: "center",
          },
        }}
      />
    </TabNavigation.Navigator>
  );
};
