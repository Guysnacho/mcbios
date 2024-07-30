import { login, signup } from "@/lib/actions/auth";
import { Database } from "@/lib/utils/supabase/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export const AuthModal = ({
  isOpen,
  setIsOpen,
  isSignUp,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSignUp: boolean | undefined;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { onClose } = useDisclosure();

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
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Login
            </ModalHeader>
            <ModalBody>
              {error ? (
                <blockquote className="blockquote">{error}</blockquote>
              ) : undefined}

              <form name="login" action={login} className="space-y-3">
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder="abcd@university.edu"
                    disabled={loading}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    placeholder="top secret password"
                    disabled={loading}
                  />
                </div>
              </form>
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
              {isSignUp ? (
                <Button
                  type="submit"
                  formAction={signup}
                  color="primary"
                  disabled={loading}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  type="submit"
                  formAction={login}
                  color="primary"
                  disabled={loading}
                >
                  Login
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
