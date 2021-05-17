// This reducer handles the theme of the app
export default function themeReducer(state = { theme: "light" }, action) {
  switch (action.type) {
    case "theme/dark":
      localStorage.setItem("theme", "dark");
      return { theme: "dark" };
    case "theme/light":
      localStorage.setItem("theme", "light");
      return { theme: "light" };
    case "theme/getLocal":
      let theme = localStorage.getItem("theme");
      if (!theme) {
        localStorage.setItem("theme", state.theme);
        return { theme: state.theme };
      }
      return { theme };
    default:
      return state;
  }
}

export const selectTheme = (state) => state.theme.theme;
