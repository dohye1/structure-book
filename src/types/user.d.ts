export {};

declare global {
  type User = {
    id: string;
    token: string;
    displayName?: string;
    email: string;
    photoURL?: string;
  };
}
