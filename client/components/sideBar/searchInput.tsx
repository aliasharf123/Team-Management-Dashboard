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
        size="md"
        onPress={onOpen}
        radius="md"
        className="w-full  justify-between  border-none "
        endContent={<Kbd keys={["command"]}>K</Kbd>}
      >
        <div className="flex items-center text-foreground gap-1">
          <PiMagnifyingGlassBold className="text-black/50 dark:text-white/90  pointer-events-none " />
          Search...
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        closeButton={<div></div>}
        onOpenChange={onOpenChange}
        size="xl"
        classNames={{
          base: "dark:bg-black/80 dark:border-[1px] border-divider bg-white/80 px-0  backdrop-blur-sm",
          header: "px-4  py-0 ",
          body: "border-t-2 border-content1",
        }}
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
                    className="bg-transparent outline-none font-normal dark:text-white/80"
                    placeholder="Search"
                  />
                </div>
                <Kbd className="text-gray-700 dark:text-white/80 font-medium text-xs py-1 ">
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
