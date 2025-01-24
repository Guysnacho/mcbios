import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { createClient } from "@/lib/utils/supabase/component";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { PaymentHandlerType } from "./PaymentHandler";
import { Database } from "@/lib/utils/supabase/types";

export const CouponCreator = () => {
  const [codeType, setCodeType] = useState<Database['public']['Enums']['code_type']>();
  return (<Stack direction={["column", null, "row"]} mx="auto" justify="space-around">
    <VStack justifyContent="center" textAlign="center">
      <Heading size="md">Create Coupon</Heading>
      <Flex justify="center">
        <Button
          colorScheme="green"
        // onClick={() => handleSubmit().catch((err) => console.error(err))}
        >
          Submit
        </Button>
        <Select
          variant="outline"
          placeholder="Select a membership level"
          onChange={(e) => {
            setTier(
              e.currentTarget.value as PaymentHandlerType
            );
          }}
        >
          <option value="student">
            Conference and Membership | Student | $200
          </option>
          <option value="postdoctorial">
            Conference and Membership | Postdoctorial | $300
          </option>
          <option value="professional">
            Conference and Membership | Professional | $400
          </option>
          {/* <option value="member_only_student">
                Membership | Student | $10
              </option>
              <option value="member_only_postdoctorial">
                Membership | Postdoctorial | $20
              </option>
              <option value="member_only_professional">
                Membership | Professional | $50
              </option> */}
        </Select>
      </Flex>
    </VStack>
    <VStack textAlign="center">
      <Heading size="md">Coupon List</Heading>
    </VStack>
  </Stack>)
}

const CouponModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
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
    if (email && password) {
      // Perform auth
      const { data, error } = await client.auth[
        isSignUp ? "signUp" : "signInWithPassword"
      ]({
        email,
        password,
        options: isSignUp
          ? { data: { fname, lname, role: "student" } }
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

            </Stack>

            {/* Form fields */}
            <Stack spacing={4}>
              {error ? (
                <blockquote className="blockquote text-orange-800">
                  {error}
                </blockquote>
              ) : undefined}

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
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose} disabled={loading} className="mr-3">
            Cancel
          </Button>

          <Button
            type="submit"
            onClick={() =>
              handleAuth(false)
                .then(() => handleClose())
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false))
            }
            colorScheme="green"
            disabled={loading}
          >
            Submit
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
