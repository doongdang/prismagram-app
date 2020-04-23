import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import style from "../style";

const NavIcon = ({ name, color = style.blackColor, size = 30 }) => (
  <Ionicons name={name} color={color} size={size} />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default NavIcon;
