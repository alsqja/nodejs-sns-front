import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import theme from "./styles/theme";

function Root() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default Root;
