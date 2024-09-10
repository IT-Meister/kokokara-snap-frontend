import {create} from 'zustand';

interface Store {
  user: Record<string, any>;
  setUser: (user: Record<string, any>) => void;
}

const useStore = create<Store>((set) => ({
  user: {},
  setUser: (user) => set({user}),
}));

export const useUser = () => useStore((state) => state.user);
export const useSetUser = () => useStore((state) => state.setUser);

export default useStore;
