import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { createClient } from "@/lib/utils/supabase/component";
import { Database } from "@/lib/utils/supabase/types";
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
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const columns = [
  { name: "#" },
  { name: "CODE" },
  { name: "TYPE" },
  { name: "EXPIRES AT" },
  { name: "CREATED AT" },
];

export const CouponCreator = () => {
  const [coupons, setCoupons] =
    useState<Database["public"]["Tables"]["admin_code"]['Row'][]>();
  const client = createClient();
  const toast = useToast();

  const fetchCoupons = () =>
    client
      .from("admin_code")
      .select("code,created_at,expires_at")
      .eq("type", "coupon")
      .then((res) => {
        if (res.error) {
          toast({
            colorScheme: "error",
            title: "Issue fetching coupons",
            description: res.error.message,
            variant: "subtle",
          });
        } else {
          setCoupons(res.data);
        }
      });

  const persistCoupon = async (coupon: {
    id: any;
    max_redemptions: any;
    redeem_by: string | number | Date;
    percent_off: any;
  }) => {
    const { data, error } = await client.from("admin_code").insert({
      code: coupon.id,
      type: "coupon",
      redemptions: coupon.max_redemptions,
      expires_at: coupon.redeem_by ? new Date(coupon.redeem_by) : undefined,
    });
    if (error) {
      toast({
        colorScheme: "warning",
        title: "Issue saving coupon, but successfully created",
        description: `Coupon Code - ${coupon.id} Percent Off: ${coupon.percent_off} Max Redemptions: ${coupon.max_redemptions}`,
      });
    } else {
      toast({
        colorScheme: "success",
        title: "Coupon created!",
        description: `Coupon Code - ${coupon.id} Percent Off: ${coupon.percent_off} Max Redemptions: ${coupon.max_redemptions}`,
      });
    }
  };

  const createCoupon = async () => {
    fetch("/api/admin", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        persistCoupon(res);
      })
      .catch((err) =>
        toast({
          colorScheme: "error",
          title: "Issue creating coupon",
          description: `Please notify the webmaster at mcbios.society@gmail.com - ${err.message} and try again later.`,
        })
      );
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <Stack direction={["column"]} gap={10} mx="auto" justify="space-around">
      <VStack justifyContent="center" textAlign="center">
        <Heading size="md">Create Coupon</Heading>
        <Flex justify="center">
          <Button colorScheme="green" onClick={() => createCoupon()}>
            Submit
          </Button>
        </Flex>
      </VStack>
      <VStack textAlign="center">
        <Heading size="md">Coupon List</Heading>

        <TableContainer>
          <Table variant="striped">
            <TableCaption>
              {coupons?.length
                ? coupons.length + " coupons created"
                : "No coupons available"}
            </TableCaption>
            <Thead>
              <Tr>
                {columns.map(({ name }) => (
                  <Th key={name}>{name}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {coupons && coupons.map((coupon, idx) => (
                <Tr key={idx}>
                  <Td>{idx}</Td>
                  <Td>{coupon.code}</Td>
                  <Td>{coupon.type}</Td>
                  <Td>{coupon.expires_at}</Td>
                  <Td>{coupon.created_at}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Stack>
  );
};

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
            <Stack align={"center"} mb={5}></Stack>

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
