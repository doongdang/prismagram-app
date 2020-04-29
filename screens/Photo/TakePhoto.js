import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import style from "../../style";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermisson, setHasPermission] = useState(false); // permission이 되었는지의 여부를 판단하기 위해 만듬
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const changeType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA); // .askAsync()=> 사용자로 하여금  ()의 승인을 요구한다. 그리고 그결과값 객체속 status를 가져온다
      if (status === "granted") {
        setHasPermission(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermisson ? (
        <Camera
          type={cameraType}
          style={{
            justifyContent: "flex-end",
            padding: 15,
            width: constants.width,
            height: constants.height / 2,
          }}
        >
          <TouchableOpacity onPress={changeType}>
            <Ionicons
              name={"md-reverse-camera"}
              size={28}
              color={style.whiteColor}
            />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
