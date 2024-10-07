import { create } from 'zustand';
import api from '../services/api';

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
  fetchUser: () => Promise<void>;
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
  fetchUser: async () => {
    try {
      const response = await api.get('/user/me');
      const user = response.data[0] as User;

      set({ user });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  },
}));
