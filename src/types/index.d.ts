export {};

declare global {
  type Option = {
    label: string;
    value: string;
  };

  type GithubTreeRequestArgs = {
    owner: string;
    repo: string;
    branch: Option;
  };
}
