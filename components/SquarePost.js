import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import constants from "../constants";
import { useNavigation } from "@react-navigation/native";

const Display = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const SquarePost = ({ files = [], id }) => {
  const navigation = useNavigation();

  return (
    <Display>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { id })}
        style={{
          width: constants.width / 3,
          height: constants.height / 5,
          flexDirection: "row",
        }}
      >
        <Image
          source={{ uri: files[0].url }}
          style={{
            width: constants.width / 3,
            height: constants.height / 5,
          }}
        />
      </TouchableOpacity>
    </Display>
  );
};

SquarePost.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};
export default SquarePost;
