import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import "react-native-gesture-handler";
import Message from "../screens/Message/Message";
import Messages from "../screens/Message/Messages";

const MessageNavigation = createStackNavigator();

export default () => {
  return (
    <MessageNavigation.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#FAFAFA" } }}
    >
      <MessageNavigation.Screen
        name="Messages"
        component={Messages}
        options={{ title: "", cardStyle: { backgroundColor: "white" } }}
      />
      <MessageNavigation.Screen
        name="Message"
        component={Message}
        options={{ title: "", cardStyle: { backgroundColor: "white" } }}
      />
    </MessageNavigation.Navigator>
  );
};
