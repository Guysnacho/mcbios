import { Database } from "@/utils/supabase/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { Dispatch, SetStateAction } from "react";

export const AuthModal = (props: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  supabase: SupabaseClient<Database>;
}) => {
  const { onClose } = useDisclosure();

  return (
    <Modal
      size="lg"
      isOpen={props.isOpen}
      onClose={() => {
        props.setIsOpen(false);
        onClose();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Member Login
            </ModalHeader>
            <ModalBody>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abcd@university.edu"
              />
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="top secret password"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
