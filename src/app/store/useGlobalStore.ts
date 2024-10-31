import { create } from 'zustand';

interface GlobalState {
  role: string;
  origin: string;
  name: string;
  setRole: (role: string) => void;
  setOrigin: (origin: string) => void;
  setName: (name: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  role: '',
  origin: '',
  name: '',
  setRole: (role) => set({ role }),
  setOrigin: (origin) => set({ origin }),
  setName: (name) => set({ name }),
}));