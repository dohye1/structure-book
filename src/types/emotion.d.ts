import "@emotion/react";

import theme from "@/styles/theme";

declare module "@emotion/react" {
  const { palette } = theme;
  export interface Theme {
    palette: typeof palette;
  }
}
