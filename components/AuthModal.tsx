import { createClient } from "@/lib/utils/supabase/component";
import { useUserStore } from "@/providers/UserStateProvider";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
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
        setIsOpen(false);
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
      }}
    >
      <ModalOverlay />
      <ModalContent>
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
            <Stack direction="column">
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={(e) => setFname(e.currentTarget.value)}
                placeholder="Jane"
                disabled={loading}
              />
              <label htmlFor="email">Last Name:</label>
              <input
                type="lname"
                name="lname"
                id="lname"
                onChange={(e) => setLname(e.currentTarget.value)}
                placeholder="Doe"
                disabled={loading}
              />
            </Stack>
          ) : undefined}

          <Stack direction="column">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="abcd@university.edu"
              disabled={loading}
            />
            <label htmlFor="email">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="top secret password"
              disabled={loading}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setIsOpen(false)}
            disabled={loading}
            className="mr-3"
          >
            Cancel
          </Button>
          {isSignUp ? (
            <Button
              type="submit"
              onClick={() =>
                handleLogin(true).finally(() =>
                  error === "" ? setIsOpen(false) : undefined
                )
              }
              colorScheme="green"
              disabled={loading}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() =>
                handleLogin(false).finally(() =>
                  error === "" ? setIsOpen(false) : undefined
                )
              }
              colorScheme="green"
              disabled={loading}
            >
              Login
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
