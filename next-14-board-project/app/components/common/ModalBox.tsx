'use client';
import { createPortal } from 'react-dom';
import { modalStore } from '@/app/contexts/modalStore';
import classes from '@/app/components/styles/modal.module.scss';
import useModal from '@/app/hooks/useModal';

const ModalBox = ({ ...props }) => {
  // const {  } = props;
  const modal_root = document.getElementById('modal-root') as HTMLElement;

  const { modalClose } = useModal();

  // Zustand
  const modalComponent = modalStore((state) => state.modalComponent);
  const modalData = modalStore((state) => state.modalData);
  // console.log(modalComponent, modalData);

  return createPortal(
    <>
      <div className={classes.modal_overlay} onClick={modalClose}></div>
      <section className={classes.modal_section}>
        <h1>Modal Component</h1>
        {modalComponent}
      </section>
    </>,
    modal_root
  );
};

export default ModalBox;
