import * as React from "react";
import { Image, View } from "react-native";
import styled from "styled-components";
import Proptypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import style from "../style";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useNavigation } from "@react-navigation/native";

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
const Container = styled.View``;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 700;
`;
const Text = styled.Text``;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
`;
const IconContainer = styled.View`
  margin-right: 5px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 3px 0px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 12px;
`;
const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
}) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = React.useState(isLikedProp);
  const [likeCount, setLikeCount] = React.useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p);

    try {
      await toggleLikeMutation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        style={{ height: constants.height / 2.5 }}
        dot={
          <View
            style={{
              backgroundColor: "rgba(0,0,0,.2)",
              width: 5,
              height: 5,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#007aff",
              width: 5,
              height: 5,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
      >
        {files.map((file) => (
          <Image
            style={{
              width: constants.width,
              height: constants.height / 2.5,
            }}
            key={file.id}
            source={{ uri: file.url }}
            resizeMode={"stretch"}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                color={isLiked ? style.redColor : style.blackColor}
                name={isLiked ? "md-heart" : "md-heart-empty"}
                size={28}
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons name={"ios-text"} size={28} />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Text>{`${likeCount} likes`}</Text>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: Proptypes.string.isRequired,
  user: Proptypes.shape({
    id: Proptypes.string.isRequired,
    avatar: Proptypes.string,
    username: Proptypes.string.isRequired,
  }).isRequired,
  files: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      url: Proptypes.string.isRequired,
    })
  ).isRequired,
  likeCount: Proptypes.number.isRequired,
  isLiked: Proptypes.bool.isRequired,
  comments: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      text: Proptypes.string.isRequired,
      user: Proptypes.shape({
        id: Proptypes.string.isRequired,
        username: Proptypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: Proptypes.string.isRequired,
  location: Proptypes.string,
  createdAt: Proptypes.string.isRequired,
};

export default Post;
