import React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const searchInput = useInput("");
  const onSubmit = () => {
    console.log("SS");
  };
  navigation.setOptions({
    headerTitle: () => <SearchBar {...searchInput} onSubmit={onSubmit} />,
  });

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};
