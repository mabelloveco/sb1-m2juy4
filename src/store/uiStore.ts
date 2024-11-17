import { create } from 'zustand';

interface UIState {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
  setRegisterModalOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  setLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen, isRegisterModalOpen: false }),
  setRegisterModalOpen: (isOpen) => set({ isRegisterModalOpen: isOpen, isLoginModalOpen: false }),
}));