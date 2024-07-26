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
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

export const AuthModal = ({
  isOpen,
  setIsOpen,
  supabase,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  supabase: SupabaseClient<Database>;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { onClose } = useDisclosure();

  const handleLogin = async () => {
    setLoading(true);
    if (email && password) {
      // const { data, error } = await supabase.auth.signUp({ email, password, options: {} });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setError("");
        onClose();
        router.push("/dashboard");
      }
    } else {
      setEmail("");
      setPassword("");
      setError("Invalid email or password provided");
    }
    setLoading(false);
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl"></ModalHeader>
            <ModalBody>
              {error ? (
                <blockquote className="blockquote">{error}</blockquote>
              ) : undefined}

              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="abcd@university.edu"
                disabled={loading}
              />
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="top secret password"
                disabled={loading}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button color="primary" onPress={handleLogin} disabled={loading}>
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
