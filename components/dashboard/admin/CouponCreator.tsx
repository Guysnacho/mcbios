import { createClient } from "@/lib/utils/supabase/component";
import { couponFetcher } from "@/lib/utils/swrFetchers";
import {
  Button,
  Flex,
  Heading,
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
import useSWR from "swr";

const columns = [
  { name: "#" },
  { name: "CODE" },
  { name: "EXPIRES AT" },
  { name: "CREATED AT" },
];

export const CouponCreator = () => {
  const client = createClient();
  const toast = useToast();

  const { data, error, isLoading, mutate } = useSWR(
    "/admin/coupon",
    () => couponFetcher(client),
    {
      onError(err) {
        toast({
          colorScheme: "error",
          title: "Issue fetching coupons",
          description: err.message,
          variant: "subtle",
        });
      },
    }
  );

  const persistCoupon = async (coupon: {
    id: any;
    max_redemptions: any;
    redeem_by: string | number | Date;
    percent_off: any;
  }) => {
    const { data, error } = await client
      .from("admin_code")
      .insert({
        code: coupon.id,
        type: "coupon",
        redemptions: coupon.max_redemptions,
        expires_at: coupon.redeem_by
          ? new Date(coupon.redeem_by).toString()
          : undefined,
      })
      .single();
    if (error) {
      toast({
        colorScheme: "warning",
        title: "Issue saving coupon, but successfully created",
        description: `Coupon Code - ${coupon.id} Percent Off: ${coupon.percent_off} Max Redemptions: ${coupon.max_redemptions}`,
        variant: "subtle",
      });
    } else {
      mutate(data);
      toast({
        colorScheme: "success",
        title: "Coupon created!",
        description: `Coupon Code - ${coupon.id} Percent Off: ${coupon.percent_off} Max Redemptions: ${coupon.max_redemptions}`,
        variant: "subtle",
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
          variant: "subtle",
        })
      );
  };

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

        <TableContainer maxH={500} overflowY="auto">
          <Table variant="striped">
            <TableCaption>
              {data && data.data
                ? data.data.length + " coupons created"
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
                data.data &&
                data.data.map((coupon, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{coupon.code}</Td>
                    <Td>{coupon.expires_at ?? "No Expiration Date"}</Td>
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
