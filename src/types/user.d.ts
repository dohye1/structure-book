export {};

declare global {
  type User = {
    id: string;
    token: string;
    displayName?: Nullable<string>;
    email: string;
    photoURL?: Nullable<string>;
  };

  type UserDetail = User & {
    // comments: Comment[];
    // likes: string[];
  };
}
