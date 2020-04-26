import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragment";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
export default ({ route }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: route.params?.id ?? "Not Found ID" },
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} /> //???????????
      )}
    </ScrollView>
  );
};
