export {};

declare global {
  type Post = {
    id: string;
    writer: User;
    stackList: Option<number>[];
    treeList: TreeList;
    description?: string;
    githubURL?: string;
  };

  type CreatePost = Omit<Post, "id">;
}
