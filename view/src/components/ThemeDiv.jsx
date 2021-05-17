import React from "react";
import { selectTheme } from "../redux/themeSlice";
import { useSelector } from "react-redux";
export default function ThemeDiv(props) {
  let theme = useSelector(selectTheme);

  return <div className={theme}>{props.children}</div>;
}
