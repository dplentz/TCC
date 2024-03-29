import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Ionicons
      name={props.icon}
      style={{ marginBottom: -7, alignContent: "center" }}
      size={25}
      color={
        props.focused
          ? isDarkmode
            ? themeColor.white100
            : themeColor.gray400
          : "#0bbc7d"
      }
    />
  );
};
