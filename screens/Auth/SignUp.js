import React, { useState } from "react";
import * as Facebook from "expo-facebook";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation, route }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(route.params?.email ?? "");
  const uNameInput = useInput("");

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: uNameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });

  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: uName } = uNameInput;

    if (fName === "" || lName === "") {
      return Alert.alert("Name Can`t be Empty!");
    }
    if (!emailRegex.test(email)) {
      return Alert.alert("Invalid Email!");
    }
    if (uName === "") {
      return Alert.alert("Invalid Username!");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        navigation.navigate("LogIn", { email });
        Alert.alert("Account Created!", "Log In Now");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("User Name // Email has already Taken!", "Log In Instead");
      navigation.navigate("LogIn", { email });
    } finally {
      setLoading(false);
    }
  };

  const fbLogIn = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync("1538847239622072");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        emailInput.setValue(email);
        fNameInput.setValue(first_name);
        lNameInput.setValue(last_name);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <TouchableWithoutFeedback disabled={loading} onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput} // value = {emailInput.value}로도 쓸 수 있음.
          placeholder={"First Name"}
          onSubEditing={handleSignUp} // 보내기버튼 클릭시 handleSignUp 실행
        />
        <AuthInput
          {...lNameInput} // value = {emailInput.value}로도 쓸 수 있음.
          placeholder={"Last Name"}
          onSubEditing={handleSignUp} // 보내기버튼 클릭시 handleSignUp 실행
        />
        <AuthInput
          {...emailInput} // value = {emailInput.value}로도 쓸 수 있음.
          placeholder={"Email"}
          keyboardType={"email-address"}
          returnKeyType={"send"} // 키보드 완료버튼 => 보내기로 변경
          onSubEditing={handleSignUp} // 보내기버튼 클릭시 handleSignUp 실행
        />
        <AuthInput
          {...uNameInput} // value = {emailInput.value}로도 쓸 수 있음.
          placeholder={"User Name"}
          returnKeyType={"send"} // 키보드 완료버튼 => 보내기로 변경
          onSubEditing={handleSignUp} // 보내기버튼 클릭시 handleSignUp 실행
        />
        <AuthButton loading={loading} onPress={handleSignUp} text={"Sign Up"} />
        <FBContainer>
          <AuthButton
            bgColor={"#2172E8"}
            loading={false}
            onPress={fbLogIn}
            text={"Connect FaceBook"}
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
