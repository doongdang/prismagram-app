import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: route.params?.email ?? "", // https://reactnavigation.org/docs/upgrading-from-4.x/ 에서 No More getParams참조
    },
  });

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invaild Secret Key!");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret); // => logIn = useLogIn상태이므로 useLogIn(confirmSecret)을 실행
      } else {
        Alert.alert("Wrong Secret Key!");
      }
    } catch (e) {
      Alert.alert("Can`t Confirm Secret Key!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback disabled={loading} onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput} // value = {confirmInput.value}로도 쓸 수 있음.
          placeholder={"Secret Key"}
          returnKeyType={"send"} // 키보드 완료버튼 => 보내기로 변경
          onSubEditing={handleConfirm} // 보내기버튼 클릭시 handleConfirm 실행
        />
        <AuthButton
          loading={loading}
          onPress={handleConfirm}
          text={"Confirm"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
