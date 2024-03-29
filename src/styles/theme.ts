import { getMedia } from "@/utils/style.util";

const palette = {
  beige1: "#312D23",
  beige2: "#5D584C",
  beige3: "#8C877A",
  beige4: "#BEB9AB",
  beige5: "#F3EDDF",
  beige6: "#f5f0e5",
  beige7: "#f7f4eb",
  beige8: "#faf7f2",
  beige9: "#fcfbf8",
  white: "#ffffff",
  black: "#000000",
  gray1: "#303030",
  gray2: "#5E5E5E",
  gray3: "#919191",
  gray4: "#a7a7a7",
  gray5: "#b2b2b2",
  gray6: "#c8c8c8",
  gray7: "#dedede",
  gray8: "#f4f4f4",
  green1: "#68b57b",
  green2: "#77bc88",
  green3: "#86c395",
  green4: "#95cba2",
  green5: "#a4d2af",
  green6: "#b3dabd",
  green7: "#c2e1ca",
  green8: "#d1e8d7",
  green9: "#e0f0e4",
  green10: "#eff7f1",
  red1: "#aa2e25",
  red2: "#c3352b",
  red3: "#db3c30",
  red4: "#f44336",
  red5: "#f55a4e",
  red6: "#f77066",
  red7: "#f8877f",
  orange1: "#db8225",
  orange2: "#de8e3a",
  orange3: "#e29b50",
  orange4: "#e5a766",
  orange5: "#e9b47c",
  orange6: "#f0cda7",
  orange7: "#f7e6d3",
} as const;

const spacing = {};

const sizes = {
  mobile: 320,
  tablet: 780,
  desktop: 1200,
};

const media = getMedia(sizes);

const theme = { palette, spacing, media };

export default theme;
