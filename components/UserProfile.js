import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";
import style from "../style";
import SquarePost from "./SquarePost";
import Post from "./Post";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColum = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;
const Stat = styled.View`
  margin-left: 30px;
  align-items: center;
`;
const StatNumber = styled.Text`
  font-weight: 700;
  margin-top: 5px;
`;
const StatName = styled.Text`
  font-size: 12px;
  color: ${style.darkGreyColor};
`;
const ProfileMeta = styled.View`
  margin-top: 10px;
  padding: 20px;
`;

const Bold = styled.Text`
  margin-top: -10px;
  font-weight: 700;
`;
const Bio = styled.Text`
  margin-top: 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

const UserProfile = ({
  avatar,
  postsCount,
  followingCount,
  followersCount,
  bio,
  fullName,
  posts,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid((p) => !p);
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <HeaderColum>
          <ProfileStats>
            <Stat>
              <StatNumber>{postsCount}</StatNumber>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followingCount}</StatNumber>
              <StatName>Following</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followersCount}</StatNumber>
              <StatName>Followers</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColum>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? style.blackColor : style.lightGreyColor}
              size={32}
              name={"md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={!isGrid ? style.blackColor : style.lightGreyColor}
              size={32}
              name={"md-list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      {posts &&
        posts.map((p) =>
          isGrid ? <SquarePost key={p.id} {...p} /> : <Post key={p.id} {...p} />
        )}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default UserProfile;
