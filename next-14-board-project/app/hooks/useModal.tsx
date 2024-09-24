import { ReactNode } from 'react';
import { modalStore } from '../contexts/modalStore';

export default function useModal() {
  // Zustand
  const setIsOpen = modalStore((state) => state.setIsOpen);
  const setModalComponent = modalStore((state) => state.setModalComponent);
  const setModalData = modalStore((state) => state.setModalData);

  const modalOpen = (component: ReactNode, data: any) => {
    setIsOpen(true);
    setModalComponent(component);
    setModalData(data);
  };

  const modalClose = () => {
    setIsOpen(false);
    setModalComponent(null);
    setModalData({});
  };

  return { modalOpen, modalClose };
}
