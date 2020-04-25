import * as React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { Platform } from "react-native";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 15px;
`;

export default () => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
      <NavIcon
        name={Platform.OS === "android" ? "md-paper-plane" : "ios-paper-plane"}
      />
    </Container>
  );
};
