"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function TaskDetailModel() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();

  return (
    <Modal
      closeButton={<div></div>}
      isOpen={searchParams.has("p")}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div>asdas</div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
