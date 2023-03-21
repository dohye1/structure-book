export {};

declare global {
  type Stack = Option<string>;

  type Post = {
    id: string;
    title: string;
    writer: User;
    stackList: Stack[];
    treeList: TreeList;
    description?: string;
    githubURL?: string;
  };

  type CreatePost = Omit<Post, "id">;
}
