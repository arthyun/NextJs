import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface UserStoreProps {
  bears: number;
  increase: (by: number) => void;
}

const store = (
  set: (arg0: (state: any) => { bears: any }) => any,
  get: any
) => ({
  bears: 0,
  increase: (by: any) => set((state) => ({ bears: state.bears + by })),
});

export const userStore = create<UserStoreProps>()(
  devtools(
    persist(store, {
      name: 'userStore',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
