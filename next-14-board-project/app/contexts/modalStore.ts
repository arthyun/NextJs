import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReactNode } from 'react';

interface ModalStoreProps {
  isOpen: boolean;
  modalComponent: null;
  modalData: any;
  setIsOpen: (by: boolean) => void;
  setModalComponent: (by: ReactNode | null) => void;
  setModalData: (by: any) => void;
}

const store = (set: any, get: any) => ({
  isOpen: false,
  modalComponent: null,
  modalData: {},
  setIsOpen: (by: boolean) => set(() => ({ isOpen: by })),
  setModalComponent: (by: ReactNode) => set(() => ({ modalComponent: by })),
  setModalData: (by: any) => set(() => ({ modalData: by })),
});

export const modalStore = create<ModalStoreProps>()(
  devtools(store, {
    name: 'modalStore',
  })
);
