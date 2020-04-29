import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import style from "../../style";

const View = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.View``;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 5px solid ${style.lightGreyColor};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true); // 한번 촬영시 이후 바로 재촬영 방지
  const [loading, setLoading] = useState(true);
  const [hasPermisson, setHasPermission] = useState(false); // permission이 되었는지의 여부를 판단하기 위해 만듬
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      }); //찍힌 사진의 uri 저장
      const asset = await MediaLibrary.createAssetAsync(uri); // 저장된 uri를 토대로 사진저장
      navigation.navigate("UploadPhoto", { photo: asset });
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true);
    }
  };
  const changeType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  }; // 전면카메라, 후면카메라 화면 교체 함수
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
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              justifyContent: "flex-end",
              padding: 15,
              width: constants.width,
              height: constants.height / 2,
            }}
          >
            <TouchableOpacity onPress={changeType}>
              <Icon>
                <Ionicons
                  name={"md-reverse-camera"}
                  size={28}
                  color={style.whiteColor}
                />
              </Icon>
            </TouchableOpacity>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};
