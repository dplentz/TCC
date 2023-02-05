import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 4,
        color: props.focused
          ? isDarkmode
            ? themeColor.white100
            : themeColor.gray400
          : "#0bbc7d",
        fontSize: 10,
      }}
    >
      {props.title}
    </Text>
  );
};
