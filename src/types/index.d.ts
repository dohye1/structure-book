import { TemplateStringsArray } from "@emotion/styled";

declare global {
  type Nullable<T> = null | T;

  type Option<T> = {
    label: string;
    value: T;
  };

  type GithubTreeRequestArgs = {
    owner: string;
    repo: string;
    branch: Option;
  };

  type BackQuoteArgs = string[];

  type Media = {
    mobile: (style: TemplateStringsArray) => SerializedStyles | undefined;
    tablet: (...args: TemplateStringsArray) => SerializedStyles | undefined;
    desktop: (...args: TemplateStringsArray) => SerializedStyles | undefined;
  };
}
