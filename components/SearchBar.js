import * as React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import constants from "../constants";
import style from "../style";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={{
      width: constants.width - 40,
      height: 35,
      backgroundColor: style.lightGreyColorS,
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
    }}
    returnKeyType={"search"}
    onChangeText={onChange}
    value={value}
    placeholder={"Search"}
    placeholderTextColor={style.darkGreyColor}
    onSubmitEditing={onSubmit}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
