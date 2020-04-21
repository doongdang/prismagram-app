import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import {
  StackHome,
  StackNotification,
  StackProfile,
  StackSearch,
} from "./StackFactory";

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator>
      <TabNavigation.Screen name="Home" component={StackHome} />
      <TabNavigation.Screen name="Search" component={StackSearch} />
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
      <TabNavigation.Screen name="Notification" component={StackNotification} />
      <TabNavigation.Screen name="Profile" component={StackProfile} />
    </TabNavigation.Navigator>
  );
};
