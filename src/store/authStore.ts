// src/store/authStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  role: 'student' | 'admin';
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: 'student' | 'admin') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 's1',
    name: 'Arya Stark',
    role: 'student',
    email: 'arya@winterfell.edu'
  },
  isAuthenticated: true,
  login: (role) => set({
    user: {
        id: role === 'student' ? 's1' : 'ad1',
        name: role === 'student' ? 'Arya Stark' : 'Administrator',
        role: role,
        email: role === 'student' ? 'arya@winterfell.edu' : 'admin@campuslink.io'
    },
    isAuthenticated: true
  }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
