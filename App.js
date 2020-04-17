import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Text, View } from "react-native";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded ? (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View> // 로딩되면 화면에 보여짐
  ) : (
    <AppLoading /> // 로딩중인 동안 보여지는 Splash Screens
  );
}
