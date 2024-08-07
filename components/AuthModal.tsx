import { createClient } from "@/lib/utils/supabase/component";
import { useUserStore } from "@/providers/UserStateProvider";
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
  isSignUp?: boolean;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { onClose } = useDisclosure();
  const client = createClient();
  const store = useUserStore((store) => store);

  const handleLogin = async (isSignUp: boolean) => {
    setLoading(true);
    setError("");
    if (email && password) {
      // const { data, error } = await supabase.auth.signUp({ email, password, options: {} });
      const { data, error } = await client.auth[
        isSignUp ? "signUp" : "signInWithPassword"
      ]({
        email,
        password,
        options: isSignUp
          ? { data: { fname, lname, role: "student" } }
          : undefined,
      });
      if (error) {
        setError(error.message);
        store.setId();
      } else {
        store.setId(data.user?.id);
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
        setError("");
        setIsOpen(false);
        onClose();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl"></ModalHeader>
            <ModalBody>
              {isSignUp ? (
                <h4 className="h4 underline">Join the Community</h4>
              ) : (
                <h4 className="h4 underline">Log In</h4>
              )}
              {error ? (
                <blockquote className="blockquote text-orange-800">
                  {error}
                </blockquote>
              ) : undefined}
              {isSignUp ? (
                <>
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    onChange={(e) => setFname(e.currentTarget.value)}
                    placeholder="Jane"
                    disabled={loading}
                  />
                  <label htmlFor="email">Last Name</label>
                  <input
                    type="lname"
                    name="lname"
                    id="lname"
                    onChange={(e) => setLname(e.currentTarget.value)}
                    placeholder="Doe"
                    disabled={loading}
                  />
                </>
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
                      error === "" ? onClose() : undefined
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
                      error === "" ? onClose() : undefined
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
