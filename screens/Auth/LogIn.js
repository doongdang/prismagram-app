import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
  const emailInput = useInput(route.params?.email ?? "");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
    },
  });

  const handleLogin = async () => {
    const { value } = emailInput;
    if (value === "") {
      return Alert.alert("Email Can`t Be Empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Not Invalid Email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("Not Invalid Email");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation(); //requestSecret의 boolean값이 들어오는지 확인
      if (requestSecret) {
        Alert.alert("Check Your Email!");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("Account Not Found!");
        navigation.navigate("SignUp", { email: value });
      }
    } catch (e) {
      Alert.alert("Can`t Log In Now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback disabled={loading} onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput} // value = {emailInput.value}로도 쓸 수 있음.
          placeholder={"Email"}
          keyboardType={"email-address"}
          returnKeyType={"send"} // 키보드 완료버튼 => 보내기로 변경
          onSubEditing={handleLogin} // 보내기버튼 클릭시 handleLogin 실행
        />
        <AuthButton loading={loading} onPress={handleLogin} text={"Log In"} />
      </View>
    </TouchableWithoutFeedback>
  );
};
