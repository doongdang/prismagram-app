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
      <PhotoTab.Screen name="SelectPhoto" component={SelectPhoto} />
      <PhotoTab.Screen name="TakePhoto" component={TakePhoto} />
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
        options={{ title: "" }}
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
