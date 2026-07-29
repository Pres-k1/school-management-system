import { createContext, useContext, useState } from "react";
import Modal from "./components/Modal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    isOpen: false,
    type: "confirm",
    title: "",
    message: "",
    confirmText: "Confirm",
    showCancel: true,
    onConfirm: () => {},
  });

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const openModal = (config) => {
    setModal({
      isOpen: true,
      type: "confirm",
      confirmText: "Confirm",
      showCancel: true,
      ...config,
      onConfirm: () => {
        config.onConfirm();
        closeModal();
      },
    });
  };

  const showSuccess = (message) => {
    setModal({
      isOpen: true,
      type: "success",
      title: "Successful",
      icon: "✅",
      message,
      confirmText: "OK",
      showCancel: false,
      onConfirm: closeModal,
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, showSuccess, closeModal }}>
      {children}
      <Modal {...modal} onCancel={closeModal} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}