export {};

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
}
