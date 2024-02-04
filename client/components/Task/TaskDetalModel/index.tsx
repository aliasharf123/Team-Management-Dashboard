"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaAnglesRight } from "react-icons/fa6";
import { MdOutlineOpenInFull } from "react-icons/md";
import IconButton from "../../Button/IconButton";
import FullPageTask from "../TaskEditor";
import Link from "next/link";
import Options from "../TaskEditor/options";
export default function TaskDetailModel() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const handleCloseModel = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("p");
    router.push(pathName + "?" + params.toString(), { scroll: false });
  };
  return (
    <Modal
      isOpen={searchParams.has("p")}
      size="xl"
      onOpenChange={onOpenChange}
      classNames={{
        base: "right-0 sm:mx-4",
        wrapper: "justify-end",
        backdrop: " opacity-40",
        header: "p-2 justify-between",
      }}
      hideCloseButton
      className="max-h-[95%]"
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 200,
            opacity: 0,
            transition: {
              ease: "easeIn",
            },
          },
        },
      }}
      scrollBehavior="inside"
      onClose={handleCloseModel}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div>
                <IconButton
                  onPress={onClose}
                  size={15}
                  content="close"
                  Icon={FaAnglesRight}
                />
                <Link href={"/dashboard/tasks/7671727837127392"}>
                  <IconButton
                    Icon={MdOutlineOpenInFull}
                    size={15}
                    content="open in full page"
                  />
                </Link>
              </div>
              <Options />
            </ModalHeader>
            <ModalBody>
              <FullPageTask />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
