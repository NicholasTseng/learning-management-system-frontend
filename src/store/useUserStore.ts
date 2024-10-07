import { create } from 'zustand';

type Role = 'learner' | 'educator';

export type User = {
  id: number;
  username: string;
  email: string;
  role: Role;
};

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
}

const initialState = {
  user: {
    id: 0,
    username: '',
    email: '',
    role: 'learner' as Role,
  },
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  updateUser: (updates) =>
    set((state) => ({
      user: { ...state.user, ...updates },
    })),
}));
