import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 15px;
`;

const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.greyColor};
  width: ${constants.width / 2};
  padding: 6px;
  border: 0.5px solid ${(props) => props.theme.lightGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  onChange,
  returnKeyType = "done", //키보드에서 완료버튼
  onEndEditing = () => null, //완료버튼 클릭시 함수 호출
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      returnKeyType={returnKeyType}
      onEndEditing={onEndEditing}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onEndEditing: PropTypes.func,
};

export default AuthInput;
