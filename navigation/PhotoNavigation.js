import * as React from "react";
import "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

const PhotoTab = createMaterialTopTabNavigator();

const PhotoTabs = () => {
  return (
    <PhotoTab.Navigator tabBarPosition="bottom">
      <PhotoTab.Screen
        name="SelectPhoto"
        component={SelectPhoto}
      ></PhotoTab.Screen>
      <PhotoTab.Screen name="TakePhoto" component={TakePhoto}></PhotoTab.Screen>
    </PhotoTab.Navigator>
  );
};

const PhotoStack = createStackNavigator();

export default () => {
  return (
    <PhotoStack.Navigator initialRouteName="PhotoTabs">
      <PhotoStack.Screen
        name="PhotoTabs"
        component={PhotoTabs}
      ></PhotoStack.Screen>
      <PhotoStack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></PhotoStack.Screen>
    </PhotoStack.Navigator>
  );
};
