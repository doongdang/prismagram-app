import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import Loader from "../../components/Loader";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermisson, setHasPermission] = useState(false); // permission이 되었는지의 여부를 판단하기 위해 만듬
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = (photo) => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); // .askAsync()=> 사용자로 하여금  ()의 승인을 요구한다. 그리고 그결과값 객체속 status를 가져온다
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
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
      ) : (
        <View>
          {hasPermisson ? (
            <>
              <Image
                style={{
                  width: constants.width,
                  height: constants.height / 2,
                }}
                source={{ uri: selected.uri }}
                resizeMode={"stretch"}
              />
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      source={{ uri: photo.uri }}
                      style={{
                        width: constants.width / 3,
                        height: constants.height / 6,
                        opacity: photo.id === selected.id ? 0.5 : 1,
                      }}
                      resizeMode={"stretch"}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            "X"
          )}
        </View>
      )}
    </View>
  );
};
