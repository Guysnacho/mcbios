import { createClient } from "@/lib/utils/supabase/component";
import { couponFetcher } from "@/lib/utils/swrFetchers";
import { DeleteIcon } from "@chakra-ui/icons";
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
  VStack
} from "@chakra-ui/react";
import useSWR from "swr";

const columns = [
  { name: "#" },
  { name: "COUPON NAME" },
  { name: "PROMO CODE" },
  { name: "% OFF" },
  { name: "TIMES REDEEMED" },
  { name: "EXPIRES AT" },
  { name: "CREATED AT" },
  { name: "Manage" },
];

export const CouponCreator = () => {
  const client = createClient();
  const toast = useToast({
    variant:"subtle"
  });

  const { data, error, isLoading, mutate } = useSWR(
    "/admin/coupon",
    () => couponFetcher(),
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
        // persistCoupon(res);
        mutate(res);
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

  const deletePromo = async (promo: string) => {
    fetch("/api/admin", { method: "DELETE", body: JSON.stringify({ promo }) })
      .then((res) => res.json())
      .then((res) => {
        mutate(res);
      })
      .catch((err) =>
        toast({
          colorScheme: "error",
          title: "Issue deleting promo code",
          description: `Please notify the webmaster at mcbios.society@gmail.com - ${err.message} and try again later.`,
          variant: "subtle",
        })
      );
  };

  const deleteCoupon = async (coupon: string) => {
    fetch("/api/admin", { method: "DELETE", body: JSON.stringify({ coupon }) })
      .then((res) => res.json())
      .then((res) => {
        mutate(res);
      })
      .catch((err) =>
        toast({
          colorScheme: "error",
          title: "Issue deleting coupon code",
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
                    <Td>{coupon.coupon.percent_off}</Td>
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
                          onClick={() => deletePromo(coupon.promo_code)}
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
