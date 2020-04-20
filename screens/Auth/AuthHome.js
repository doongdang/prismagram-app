import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>Auth Home</Text>
    <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
      <Text>Go to Log In</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
      <Text>Go to Sign Up</Text>
    </TouchableOpacity>
  </View>
);
