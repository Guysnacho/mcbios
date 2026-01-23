import { isPresent } from "@/lib";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import {
  PaymentBody,
  PaymentHandlerType,
} from "../dashboard/PaymentHandler";

export const NameTagForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [institution, setInstitution] = useState("");
  const [tier, setTier] = useState<PaymentHandlerType>();
  const [error, setError] = useState("");
  const isValid =
    isPresent(email) &&
    isPresent(fname) &&
    isPresent(lname) &&
    isPresent(institution) &&
    isPresent(tier);
  const toast = useToast();

  const handleClose = () => {
    setEmail("");
    setFname("");
    setLname("");
    setInstitution("");
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    if (isPresent(email) && isPresent(institution)) {
      const res = await fetch("/api/checkout", {
        method: "PUT",
        body: JSON.stringify({
          email,
          institution,
          fname,
          lname,
          tier,
        } satisfies PaymentBody),
      });

      // Handle response
      if (!res.ok) {
        throw new Error(await res.json());
      } else {
        setIsOpen(false);
        toaster.create({
          status: "success",
          duration: 6000,
          isClosable: true,
          description: "Thank you for your submission",
        });
      }
    } else {
      setEmail("");
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
              <Heading fontSize={"2xl"} textAlign={"center"}>
                Name Tag Details
              </Heading>
            </Stack>

            {/* Form fields */}
            <Stack spacing={4}>
              {error ? (
                <blockquote className="blockquote text-orange-800">
                  {error}
                </blockquote>
              ) : undefined}
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
              <FormControl id="institution" isRequired isDisabled={loading}>
                <FormLabel>Institution</FormLabel>
                <Input
                  type="text"
                  inputMode="text"
                  onChange={(e) => setInstitution(e.currentTarget.value)}
                  value={institution}
                />
              </FormControl>
              <FormControl id="email" isRequired isDisabled={loading}>
                <FormLabel>
                  Email address
                  <span className="opacity-75">
                    <br/>Provide the email you&apos;ve registered with
                  </span>
                </FormLabel>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  value={email}
                />
              </FormControl>
              <Flex mx="auto">
                <FormControl id="tier" isRequired isDisabled={loading}>
                  <Select
                    variant="outline"
                    placeholder="Select your registration level"
                    onChange={(e) => {
                      setTier(e.currentTarget.value as PaymentHandlerType);
                    }}
                  >
                    {/* <option value="student">
                    Conference and Membership | Student | $200
                  </option>
                  <option value="postdoctorial">
                    Conference and Membership | Postdoctorial | $300
                  </option>
                  <option value="professional">
                    Conference and Membership | Professional | $400
                  </option> */}
                    <option value="student">Student</option>
                    <option value="postdoctorial">Postdoctorial</option>
                    <option value="professional">Professional</option>
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
                </FormControl>
              </Flex>
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose} isDisabled={loading} className="mr-3">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() =>
              handleSubmit()
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false))
            }
            colorScheme="green"
            isDisabled={loading || !isValid}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
