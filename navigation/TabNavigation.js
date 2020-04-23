import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";

import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notification from "../screens/Tab/Notification";
import Profile from "../screens/Tab/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { Platform } from "react-native";

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
    <TabNavigation.Navigator tabBarOptions={{ showLabel: false }}>
      <TabNavigation.Screen
        name="Home"
        component={stackInsert}
        initialParams={{
          initialRoute: Home,
          customConfig: {
            headerTitleAlign: "center",
            headerTitle: <NavIcon name={"logo-instagram"} size={40} />,
            headerRight: () => <MessagesLink />,
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon name={focused ? "md-home" : "ios-home"} />
          ),
        }} // 이건 왜 이렇게 해야하는지 모르겟다. 정확히는 focused의 역할이 뭔지 모르겟음. 되긴하니까 걍 함.
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon name={focused ? "md-search" : "ios-search"} />
          ),
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon name={focused ? "md-add" : "ios-add"} />
          ),
        }}
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon name={focused ? "md-heart" : "ios-heart"} />
          ),
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon name={focused ? "md-person" : "ios-person"} />
          ),
        }}
      />
    </TabNavigation.Navigator>
  );
};
