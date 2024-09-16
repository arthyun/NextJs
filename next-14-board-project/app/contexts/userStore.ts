import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface UserStoreProps {
  bears: number;
  increase: (by: number) => void;
}

const store = (set, get) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
});

export const userStore = create<UserStoreProps>()(
  devtools(
    persist(store, {
      name: 'userStore',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
