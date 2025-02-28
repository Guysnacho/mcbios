import { createClient } from "@/lib/utils/supabase/component";
import { couponFetcher } from "@/lib/utils/swrFetchers";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";

const columns = [
  { name: "#" },
  { name: "COUPON NAME" },
  { name: "PROMO CODE" },
  { name: "% OFF" },
  { name: "$ OFF" },
  { name: "TIMES REDEEMED" },
  { name: "EXPIRES AT" },
  { name: "CREATED AT" },
  { name: "Manage" },
];

export const CouponCreator = () => {
  const client = createClient();
  const toast = useToast({
    variant: "subtle",
  });
  const [coupon, setCoupon] = useState<string | undefined>();
  const [couponName, setCouponName] = useState<string | undefined>();
  const [discount, setDiscount] = useState<number | undefined>();
  const [percentage, setPercentage] = useState<number | undefined>();

  const { data, error, isLoading, mutate } = useSWR(
    "/admin/coupon",
    () => couponFetcher(),
    {
      onError(err) {
        toast({
          status: "error",
          title: "Issue fetching coupons",
          description: err.message,
          variant: "subtle",
        });
      },
    }
  );

  const createCoupon = async () => {
    fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(
        discount
          ? {
              couponName,
              discount,
            }
          : percentage
          ? { couponName, percentage }
          : {
              coupon,
            }
      ),
    })
      .then((res) => res.json())
      .then((res) => {
        // persistCoupon(res);
        mutate(res);
      })
      .catch((err) =>
        toast({
          status: "error",
          title: "Issue creating coupon",
          description: `Please notify the webmaster at mcbios.society@gmail.com - ${err.message} and try again later.`,
          variant: "subtle",
        })
      )
      .finally(() => {
        setCoupon(undefined);
        setCouponName(undefined);
        setDiscount(undefined);
        setPercentage(undefined);
      });
  };

  const deletePromo = async (promo: string) => {
    fetch("/api/admin", { method: "DELETE", body: JSON.stringify({ promo }) })
      .then((res) => res.json())
      .then((res) => {
        mutate(res);
      })
      .catch((err) =>
        toast({
          status: "error",
          title: "Issue deleting promo code",
          description: `Please notify the webmaster at mcbios.society@gmail.com - ${err.message} and try again later.`,
          variant: "subtle",
        })
      )
      .finally(() => {
        setCoupon(undefined);
        setCouponName(undefined);
        setDiscount(undefined);
        setPercentage(undefined);
      });
  };

  const deleteCoupon = async (coupon: string) => {
    fetch("/api/admin", { method: "DELETE", body: JSON.stringify({ coupon }) })
      .then((res) => res.json())
      .then((res) => {
        mutate(res);
      })
      .catch((err) =>
        toast({
          status: "error",
          title: "Issue deleting coupon code",
          description: `Please notify the webmaster at mcbios.society@gmail.com - ${err.message} and try again later.`,
          variant: "subtle",
        })
      )
      .finally(() => {
        setCoupon(undefined);
        setCouponName(undefined);
        setDiscount(undefined);
        setPercentage(undefined);
      });
  };

  return (
    <Stack direction={["column"]} gap={10} mx="auto" justify="space-around">
      <VStack justifyContent="center" textAlign="center">
        <Heading size="md">Create Coupon</Heading>
        <Box>
          <FormControl id="coupon_name">
            <FormLabel>New Coupon Name</FormLabel>
            <Input
              type="text"
              inputMode="text"
              onChange={(e) => setCouponName(e.currentTarget.value)}
              value={couponName}
            />
          </FormControl>
          <Flex gap={3}>
            <FormControl id="percentage_off" isDisabled={!!discount}>
              <FormLabel>% off - Provide a whole number</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="80"
                  onChange={(e) =>
                    setPercentage(Number.parseInt(e.currentTarget.value))
                  }
                  value={percentage}
                />
                <InputRightAddon>%</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="raw_discount" isDisabled={!!percentage}>
              <FormLabel>$ off - Provide a dollar amount</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="50"
                  onChange={(e) =>
                    setDiscount(Number.parseInt(e.currentTarget.value))
                  }
                  value={discount}
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <Heading my={5}>Or</Heading>
          <Select
            variant="outline"
            icon={<ChevronDownIcon />}
            onChange={(e) => {
              console.log(e.target.value);
              setCoupon(e.target.value || undefined);
            }}
            value={couponName}
            placeholder="Select a coupon to duplicate"
          >
            {data &&
              data.length > 0 &&
              data.map((promo) => (
                <option key={promo.promo_id} value={promo.coupon.id}>
                  Coupon Name - {promo.coupon.name || "null"} | Promo Code -{" "}
                  {promo.promo_code} | % off - {promo.coupon.percent_off}
                </option>
              ))}
          </Select>
        </Box>
        <Button colorScheme="green" onClick={() => createCoupon()}>
          Submit
        </Button>
      </VStack>
      <VStack textAlign="center">
        <Heading size="md">Coupon List</Heading>

        <TableContainer maxH={500} overflowY="auto">
          <Table variant="striped">
            <TableCaption>
              {data && data.length
                ? data.length + " coupons created"
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
              {isLoading && <Spinner />}
              {!isLoading &&
                data &&
                data.length &&
                data.map((coupon, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{coupon.coupon.name || "null"}</Td>
                    <Td>{coupon.promo_code}</Td>
                    <Td>
                      {coupon.coupon.percent_off
                        ? `${coupon.coupon.percent_off}%`
                        : "-"}
                    </Td>
                    <Td>
                      {coupon.coupon.amount_off
                        ? `$${coupon.coupon.amount_off}`
                        : "-"}
                    </Td>
                    <Td>
                      {coupon.coupon.times_redeemed} /{" "}
                      {coupon.coupon.max_redemptions}
                    </Td>
                    <Td>
                      {coupon.expires_at! <= 1743119940
                        ? "No Expiration Date"
                        : new Date(
                            coupon.expires_at! * 1000
                          ).toLocaleDateString()}
                    </Td>
                    <Td>{new Date(coupon.created).toLocaleDateString()}</Td>
                    <Td>
                      <Stack>
                        <Button
                          colorScheme="purple"
                          onClick={() => deletePromo(coupon.promo_id)}
                          aria-label="Delete Promo Code"
                          leftIcon={<DeleteIcon />}
                        >
                          Delete Promo Code
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteCoupon(coupon.coupon.id)}
                          aria-label="Delete Promo Code"
                          leftIcon={<DeleteIcon />}
                        >
                          Delete Coupon
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Stack>
  );
};
