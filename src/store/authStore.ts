import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  location: string;
  verified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        try {
          // Simulate API call
          const user = {
            id: '1',
            name: 'Mike Anderson',
            username: '@car_enthusiast',
            email,
            avatar: null,
            bio: 'Passionate car photographer and automotive journalist.',
            location: 'Los Angeles, CA',
            verified: true,
          };
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw new Error('Login failed');
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
);