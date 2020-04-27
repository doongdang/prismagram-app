import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragment";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import { useQuery } from "@apollo/react-hooks";
import UserProfile from "../../components/UserProfile";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);
  console.log(loading, data);
  navigation.setOptions({
    headerTitle: data.me ? data.me.username : "Loading",
  });

  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
