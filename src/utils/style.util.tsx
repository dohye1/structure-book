import { css } from "@emotion/react";

export const getMedia = (mediaSizes: Record<string, number>) => {
  const media: Media = {
    mobile: (...args: BackQuoteArgs) => undefined,
    tablet: (...args: BackQuoteArgs) => undefined,
    desktop: (...args: BackQuoteArgs) => undefined,
  };

  Object.keys(mediaSizes).reduce((acc: Media, label: string) => {
    switch (label) {
      case "desktop":
        acc.desktop = (...args: BackQuoteArgs) =>
          css`
            @media only screen and (min-width: ${mediaSizes.desktop}px) {
              ${args}
            }
          `;
        break;
      case "tablet":
        acc.tablet = (...args: BackQuoteArgs) =>
          css`
            @media only screen and (max-width: ${mediaSizes.desktop}px) and (min-width: ${mediaSizes.tablet}px) {
              ${args}
            }
          `;
        break;
      case "mobile":
        acc.mobile = (...args: BackQuoteArgs) =>
          css`
            @media only screen and (max-width: ${mediaSizes.tablet}px) {
              ${args}
            }
          `;
        break;
      default:
        break;
    }
    return acc;
  }, media);

  return media;
};
