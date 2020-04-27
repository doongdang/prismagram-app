import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import SquarePost from "../../components/SquarePost";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const View = styled.View`
  margin-top: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const searchInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (text) => {
      setValue(text);
      setShouldFetch(false);
    };
    return { value, onChange, setValue };
  }; //Input에 입력중인 동안, 즉 onChange가 실행중일 경우에 shouldFetch를 false로 하여 Query Skip

  const searchTerm = searchInput("");
  const [refreshing, setRefreshing] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false); //Input에 입력중인 동안, 즉 onChange가 실행중일 경우에 shouldFetch를 false로 하여 Query Skip
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term: searchTerm.value,
    },
    skip: !shouldFetch, // shouldFetch가 true인 경우 Query 던지고 False인 경우 스킵함
  });

  const onSubmit = () => {
    setShouldFetch(true); // 키보드에서 완료 버튼 누를시에 shouldFetch를 true로 돌리며 Query보내기
  };
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term: searchTerm.value } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  navigation.setOptions({
    headerTitle: () => <SearchBar {...searchTerm} onSubmit={onSubmit} />,
  });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map((post) => <SquarePost key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
