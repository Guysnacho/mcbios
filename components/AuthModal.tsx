import { login, signup } from "@/lib/actions/auth";
import { createClient } from "@/lib/utils/supabase/client";
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
  const client = createClient();

  const handleLogin = async (isSignUp: boolean) => {
    setLoading(true);
    setError("");
    if (email && password) {
      // const { data, error } = await supabase.auth.signUp({ email, password, options: {} });
      const { error } = await client.auth[
        isSignUp ? "signUp" : "signInWithPassword"
      ]({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
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
                autoComplete={isSignUp ? "new-password" : "current-password"}
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
              {isSignUp ? (
                <Button
                  type="submit"
                  onPress={() =>
                    handleLogin(true).finally(() =>
                      !error ? onClose() : undefined
                    )
                  }
                  color="primary"
                  disabled={loading}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  type="submit"
                  onPress={() =>
                    handleLogin(false).finally(() =>
                      !error ? onClose() : undefined
                    )
                  }
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
