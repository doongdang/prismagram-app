import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notification from "../screens/Tab/Notification";
import Profile from "../screens/Tab/Profile";
import Detail from "../screens/Detail";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { CardStyleInterpolators } from "@react-navigation/stack";
import UserDetail from "../screens/UserDetail";

const TabNavigation = createBottomTabNavigator();
const stackFactory = createStackNavigator();
const stackInsert = ({ route }) => {
  const { initialRoute, customConfig } = route.params;

  return (
    <stackFactory.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "white" },
        headerStyle: { backgroundColor: "#FAFAFA" },
      }}
    >
      <stackFactory.Screen
        name={route.name}
        component={initialRoute}
        options={customConfig}
      />
      <stackFactory.Screen
        name={"Detail"}
        component={Detail}
        options={{
          title: "",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <stackFactory.Screen
        name={"UserDetail"}
        component={UserDetail}
        options={{
          headerTitleAlign: "center",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </stackFactory.Navigator>
  );
};

export default () => {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "#FAFAFA" },
      }}
      initialRouteName={"Profile"}
    >
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
            <NavIcon name={"md-home"} size={28} focused={focused} />
          ),
        }} // focused ==> 탭에 현재 있는지 아닌지를 판단.
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
            <NavIcon name={"md-search"} size={28} focused={focused} />
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
            <NavIcon
              name={"md-add-circle-outline"}
              size={28}
              focused={focused}
            />
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
            <NavIcon
              name={focused ? "md-heart" : "md-heart-empty"}
              size={28}
              focused={focused}
            />
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
            <NavIcon name={"md-person"} size={28} focused={focused} />
          ),
        }}
      />
    </TabNavigation.Navigator>
  );
};
