import * as React from "react";
import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import style from "../style";
const PhotoTab = createMaterialTopTabNavigator();

const PhotoTabs = () => {
  return (
    <PhotoTab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: { backgroundColor: style.blueColor },
        style: { backgroundColor: "#FAFAFA" },
        labelStyle: { fontWeight: "700" },
      }}
    >
      <PhotoTab.Screen
        name="SelectPhoto"
        component={SelectPhoto}
        options={{ tabBarLabel: "Select" }}
      />
      <PhotoTab.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{ tabBarLabel: "Take" }}
      />
    </PhotoTab.Navigator>
  );
};

const PhotoStack = createStackNavigator();

export default () => {
  return (
    <PhotoStack.Navigator
      initialRouteName="PhotoTabs"
      screenOptions={{
        cardStyle: { backgroundColor: "white" },
        headerStyle: { backgroundColor: "#FAFAFA" },
      }}
    >
      <PhotoStack.Screen
        name="PhotoTabs"
        component={PhotoTabs}
        options={{ title: "", headerShown: false }}
      />
      <PhotoStack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{
          title: "",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </PhotoStack.Navigator>
  );
};
