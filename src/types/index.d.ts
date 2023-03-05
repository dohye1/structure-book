export {};

declare global {
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
