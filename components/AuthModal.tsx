import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { isPresent } from "@/lib";
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
    setIsOpen(false);
  };

  const handleAuth = async (isSignUp: boolean) => {
    setLoading(true);
    setError("");
    if (isPresent(email) && isPresent(password)) {
      // Perform auth
      const { data, error } = await client.auth[
        isSignUp ? "signUp" : "signInWithPassword"
      ]({
        email,
        password,
        options: isSignUp
          ? {
              data: {
                fname,
                lname,
                role: "student",
                institution,
                org_id: process.env.NEXT_PUBLIC_ORG_ID,
              },
            }
          : undefined,
      });
      // Handle response
      if (error) {
        throw error;
      } else if (!isSignUp) {
        store?.setId(data.user?.id);
        setIsOpen(false);
        router.push("/dashboard");
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
      setEmail("");
      setPassword("");
      setError("Invalid email or password provided");
    }
    setLoading(false);
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-xl"></ModalHeader>
        <ModalBody gap={3}>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
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
                    Signing up will allow you to register for the conference and
                    gain access to other features like conference session
                    recordings.
                  </Text>
                  <Alert borderRadius="xl">
                    <AlertIcon>
                      <InfoIcon m="auto" />
                    </AlertIcon>
                    <AlertDescription>
                      We are currently addressing account confirmation email
                      delivery issues for emails ending with <Code>.edu</Code>.
                      We still encourage you to sign up but{" "}
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
                    <FormControl id="firstName" isRequired isDisabled={loading}>
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
                    <FormControl id="lastName" isDisabled={loading}>
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
                  {isSignUp ? "Already a member? " : "Haven't signed up yet? "}
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
            <Button
              type="submit"
              onClick={() =>
                handleAuth(true)
                  .then(() => handleClose())
                  .catch((error) => setError(error.message))
                  .finally(() => setLoading(false))
              }
              colorScheme="green"
              isDisabled={loading}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() =>
                handleAuth(false)
                  .then(() => handleClose())
                  .catch((error) => setError(error.message))
                  .finally(() => setLoading(false))
              }
              colorScheme="green"
              isDisabled={loading}
            >
              Login
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
