'use client';
import { createPortal } from 'react-dom';
import { modalStore } from '@/app/contexts/modalStore';
import { MouseEvent } from 'react';
import classes from '@/app/components/styles/modal.module.scss';

const ModalBox = ({ ...props }) => {
  // const {  } = props;
  const modal_root = document.getElementById('modal-root') as HTMLElement;

  // Zustand
  const setIsOpen = modalStore((state) => state.setIsOpen);
  const modalComponent = modalStore((state) => state.modalComponent);
  const modalData = modalStore((state) => state.modalData);
  console.log(modalComponent, modalData);

  const closeModal = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return createPortal(
    <>
      <div className={classes.modal_overlay} onClick={closeModal}></div>
      <section className={classes.modal_section}>
        <h1>Modal Component</h1>
        {modalComponent}
      </section>
    </>,
    modal_root
  );
};

export default ModalBox;
