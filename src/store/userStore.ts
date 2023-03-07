import { create } from "zustand";

type UserStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const userStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default userStore;
