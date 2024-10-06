import { create } from 'zustand';

type Role = 'learner' | 'educator';

export type User = {
  username: string;
  email: string;
  role: Role;
};

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  fetchUser: () => Promise<void>;
}

const initialState = {
  user: {
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
  fetchUser: async () => {
    try {
      // TODO: Hook up with the API
      // const response = await fetch('/api/user');
      const user: User = {
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        role: 'educator',
      };
      set({ user });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  },
}));
