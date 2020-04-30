import useInput from "../../hooks/useInput";
import styled from "styled-components";
import constants from "../../constants";
import React, { useState } from "react";
import { Image, ActivityIndicator, Alert, View } from "react-native";
import style from "../../style";
import axios from "axios";
import apolloClientOptions from "../../apollo";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { FEED_QUERY } from "../Tab/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

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

export default ({ route, navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");
  const photo = route.params.photo;
  const name = photo.filename;
  const [, type] = name.split(".");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData(); // form 필드와 그 값을 나타내는 key,value를 쉽게 생성할수 있게 함. XMLHttpRequest.send()를 사용해 전송가능
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: photo.uri,
    }); // file = name 미들웨어에 주었던 이름
    try {
      setIsLoading(true);
      const {
        data: { path },
      } = await axios.post(
        apolloClientOptions.uri.toString() + "api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [path],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });
      console.log(path);
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
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
