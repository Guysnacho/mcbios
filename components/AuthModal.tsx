import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { createClient } from "@/lib/supabase/component";
import { InfoIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Code,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

export const AuthModal = ({
  isOpen,
  setIsOpen,
  isSignUp,
  setIsSignUp,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSignUp?: boolean;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const client = createClient();
  const store = useStore(useUserStore, (store) => store);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");
    setInstitution("");
    setIsOpen(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { success, error } = SignInSchema.safeParse({
      email,
      password,
    });
    if (success) {
      // Perform auth
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      // Handle response
      if (error) {
        throw error;
      } else {
        store?.setId(data.user?.id);
        setIsOpen(false);
        router.push("/dashboard");
      }
    } else {
      setPassword("");
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(", "))
          .join(", ")
      );
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const { success, error } = SignUpSchema.safeParse({
      email,
      password,
      institution,
      fname,
      lname,
    });
    if (success) {
      // Perform auth
      const { error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            fname,
            lname,
            role: "student",
            institution,
            org_id: process.env.NEXT_PUBLIC_ORG_ID,
          },
        },
      });
      // Handle response
      if (error) {
        throw error;
      } else {
        setIsOpen(false);
        toast({
          status: "success",
          duration: 6000,
          isClosable: true,
          description: "Please check your email for a confirmation.",
        });
      }
    } else {
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(" | "))
          .join(" | ")
      );
    }
    setLoading(false);
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (isSignUp) {
              handleSignUp()
                .then(() => handleClose())
                .catch((error) => {
                  toast({
                    colorScheme: "red",
                    title: "Ran into an issue signing up",
                    description: error.message,
                  });
                  console.error(error);
                })
                .finally(() => setLoading(false));
            } else {
              handleLogin()
                .then(() => handleClose())
                .catch((error) => {
                  toast({
                    colorScheme: "red",
                    title: "Ran into an issue logging in",
                    description: error.message,
                  });
                  console.error(error);
                })
                .finally(() => setLoading(false));
            }
          }}
        >
          <ModalHeader className="flex flex-col gap-1 text-xl"></ModalHeader>
          <ModalBody gap={3}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              p={8}
            >
              <Stack align={"center"} mb={5}>
                {isSignUp ? (
                  <>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                      Join the Community
                    </Heading>
                    <Text
                      color={"gray.600"}
                      className="border-l-gray-600 border-l-2 pl-3"
                    >
                      Signing up will allow you to register for the conference
                      and gain access to other features like conference session
                      recordings.
                    </Text>
                    <Alert borderRadius="xl">
                      <AlertIcon>
                        <InfoIcon m="auto" />
                      </AlertIcon>
                      <AlertDescription>
                        We are currently addressing account confirmation email
                        delivery issues for emails ending with <Code>.edu</Code>
                        . We still encourage you to sign up but{" "}
                        <Link
                          href="/events"
                          textDecoration="underline"
                          _hover={{ shadow: "lg" }}
                        >
                          also provide a method to register for the conference
                          without an account.
                        </Link>
                      </AlertDescription>
                    </Alert>
                  </>
                ) : (
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                    Log In
                  </Heading>
                )}
              </Stack>

              {/* Form fields */}
              <Stack spacing={4}>
                {error ? (
                  <blockquote className="blockquote text-orange-800">
                    {error}
                  </blockquote>
                ) : undefined}
                {isSignUp && (
                  <HStack>
                    <Box>
                      <FormControl
                        id="firstName"
                        isRequired
                        isDisabled={loading}
                      >
                        <FormLabel>First Name</FormLabel>
                        <Input
                          type="text"
                          inputMode="text"
                          autoComplete="given-name"
                          onChange={(e) => setFname(e.currentTarget.value)}
                          value={fname}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl
                        id="lastName"
                        isRequired
                        isDisabled={loading}
                      >
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          type="text"
                          inputMode="text"
                          autoComplete="family-name"
                          onChange={(e) => setLname(e.currentTarget.value)}
                          value={lname}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                )}
                {isSignUp && (
                  <FormControl id="institution" isRequired isDisabled={loading}>
                    <FormLabel>Institution</FormLabel>
                    <Input
                      type="text"
                      inputMode="text"
                      onChange={(e) => setInstitution(e.currentTarget.value)}
                      value={institution}
                      isRequired
                    />
                  </FormControl>
                )}
                <FormControl id="email" isRequired isDisabled={loading}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    value={email}
                  />
                </FormControl>
                <FormControl id="password" isRequired isDisabled={loading}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      value={password}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack pt={6}>
                  <Text align={"center"}>
                    {isSignUp
                      ? "Already a member? "
                      : "Haven't signed up yet? "}
                    <Link
                      color={"blue.400"}
                      onClick={() => !loading && setIsSignUp(!isSignUp)}
                    >
                      {isSignUp ? "Login" : "Sign Up"}
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleClose} isDisabled={loading} className="mr-3">
              Cancel
            </Button>
            {isSignUp ? (
              <Button type="submit" colorScheme="green" isDisabled={loading}>
                Sign Up
              </Button>
            ) : (
              <Button type="submit" colorScheme="green" isDisabled={loading}>
                Login
              </Button>
            )}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

const SignUpSchema = z.object({
  fname: z
    .string()
    .min(2, {
      error: "Invalid given name, minimum of 2 characters",
    })
    .describe("User's given name // Please provide your given name"),
  lname: z
    .string()
    .min(3, { error: "Invalid given name, minimum of 2 characters" })
    .describe("User's family name // Please provide your family name"),
  institution: z
    .string()
    .min(3, {
      error: "Please provide your affiliated institution",
    })
    .describe("Affiliated institution"),
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
  password: z
    .string()
    .min(3, {
      error: "Password too short, minimum of 3 characters",
    })
    .describe("User's password"),
});

const SignInSchema = z.object({
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
  password: z
    .string()
    .min(3, {
      error: "Password too short, minimum of 3 characters",
    })
    .describe("User's password"),
});
