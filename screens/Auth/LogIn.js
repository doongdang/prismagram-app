import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  const emailInput = useInput("");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = () => {
    const { value } = emailInput;
    if (value === "") {
      return Alert.alert("Email Can`t Be Empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Not Invalid Email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("Not Invalid Email");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput} // value = {emailInput.value}로도 쓸 수 있음.
          placeholder={"Email"}
          keyboardType={"email-address"}
          returnKeyType={"send"}
          onEndEditing={handleLogin}
        />
        <AuthButton onPress={handleLogin} text={"Log In"} />
      </View>
    </TouchableWithoutFeedback>
  );
};
