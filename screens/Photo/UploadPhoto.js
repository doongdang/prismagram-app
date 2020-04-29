import useInput from "../../hooks/useInput";
import styled from "styled-components";
import constants from "../../constants";
import React, { useState } from "react";
import { Image, ActivityIndicator, Alert, View } from "react-native";
import style from "../../style";
import axios from "axios";

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${style.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ route }) => {
  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const photo = route.params.photo;
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData(); // form 필드와 그 값을 나타내는 key,value를 쉽게 생성할수 있게 함. XMLHttpRequest.send()를 사용해 전송가능
    formData.append("file", photo); // file = name 미들웨어에 주었던 이름, photo =value // append =>FormData 객체에 추가
    console.log(photo);
    axios.post("http://192.168.0.24:4000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={style.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={style.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
