"use client";
import {
  Button,
  Checkbox,
  Input,
  Kbd,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

export default function SearchInput() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="faded"
        size="lg"
        onPress={onOpen}
        className="w-64  justify-start rounded-xl border-none text-slate-500 "
      >
        <PiMagnifyingGlassBold className="text-black/50  mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none " />
        search
      </Button>
      <Modal
        isOpen={isOpen}
        closeButton={<div></div>}
        onOpenChange={onOpenChange}
        size="xl"
        classNames={{
          base: "bg-[rgba(255,255,255,0.8)] px-0  backdrop-blur-sm",
          header: "px-4 border-b-[1px] border-b-gray-400 py-0 ",
          body: "border-t-2",
        }}
        className="backdrop-blur-sm "
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                <div className="text-lg w-full gap-2 py-4 flex items-center ">
                  <div className="pointer-events-none flex items-center">
                    <PiMagnifyingGlassBold
                      size={20}
                      className="text-default-400"
                    />
                  </div>
                  <input
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.code === "Escape") onClose();
                    }}
                    className="bg-transparent outline-none font-normal text-gray-700"
                    placeholder="Search"
                  />
                </div>
                <Kbd className="text-gray-700 font-medium text-xs py-1 ">
                  ESC
                </Kbd>
              </ModalHeader>
              <ModalBody>
                <div>{/* searched items */}s kasjskj</div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
