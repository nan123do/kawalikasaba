import { motion } from 'framer-motion';
import React from 'react'

interface ModalProps {
  isVisible: boolean;
  onCLose: VoidFunction;
  children: React.ReactNode;
  color: string;
}

function Modal({ isVisible = false, onCLose, children, color }: ModalProps) {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrap") onCLose();
  }

  return (
    <div
      className={`fixed inset-0 bg-${color}/10 flex justify-center items-center backdrop-blur-sm max-h-full`}
      id="wrap"
      onClick={handleClose}
    >
      <motion.div
        className="w-[90vh] md:w-[100vh] flex flex-col"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <div className={`bg-${color} p-4 rounded-lg text-left`}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default Modal