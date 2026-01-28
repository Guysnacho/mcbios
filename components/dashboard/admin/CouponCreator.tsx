import { couponFetcher } from "@/lib";
import { Trash2 } from "lucide-react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  NativeSelect,
  Spinner,
  Stack,
  Table,
  VStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
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
  const [coupon, setCoupon] = useState<string | undefined>();
  const [couponName, setCouponName] = useState<string | undefined>();
  const [discount, setDiscount] = useState<number | undefined>();
  const [percentage, setPercentage] = useState<number | undefined>();

  const { data, error, isLoading, mutate } = useSWR(
    "/admin/coupon",
    () => couponFetcher(),
    {
      onError(err) {
        toaster.error({
          title: "Issue fetching coupons",
          description: err.message,
        });
      },
    },
  );

  const createCoupon = async () => {
    const res = await fetch("/api/admin", {
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
              },
      ),
    });
    if (res.ok) mutate();
    else {
      const err = await res.json();
      toaster.error({
        title: "Issue creating coupon",
        description: `Please notify the webmaster at team@tunjiproductions.com - ${err.message}`,
      });
    }
    setCoupon(undefined);
    setCouponName(undefined);
    setDiscount(undefined);
    setPercentage(undefined);
  };

  const deletePromo = async (promo: string) => {
    try {
      const res = await fetch("/api/admin", {
        method: "DELETE",
        body: JSON.stringify({ promo }),
      });
      if (res.ok) mutate();
      else {
        const err = await res.json();
        toaster.error({
          title: "Issue deleting promo code",
          description: `Please notify the webmaster at team@tunjiproductions.com - ${err.message}`,
        });
      }
    } finally {
      setCoupon(undefined);
      setCouponName(undefined);
      setDiscount(undefined);
      setPercentage(undefined);
    }
  };

  const deleteCoupon = async (couponId: string) => {
    try {
      const res = await fetch("/api/admin", {
        method: "DELETE",
        body: JSON.stringify({ coupon: couponId }),
      });
      if (res.ok) mutate();
      else {
        const err = await res.json();
        toaster.error({
          title: "Issue deleting coupon code",
          description: `Please notify the webmaster at team@tunjiproductions.com - ${err.message}`,
        });
      }
    } finally {
      setCoupon(undefined);
      setCouponName(undefined);
      setDiscount(undefined);
      setPercentage(undefined);
    }
  };

  return (
    <Stack direction={["column"]} gap={10} mx="auto" justify="space-around">
      <VStack justifyContent="center" textAlign="center">
        <Heading size="md">Create Coupon</Heading>
        <Box>
          <Field label="New Coupon Name">
            <Input
              type="text"
              inputMode="text"
              maxLength={40}
              onChange={(e) => setCouponName(e.currentTarget.value)}
              value={couponName}
            />
          </Field>
          <Flex gap={3}>
            <Field label="% off - Provide a whole number" disabled={!!discount}>
              <InputGroup endElement={<span>%</span>}>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="80"
                  onChange={(e) =>
                    setPercentage(Number.parseInt(e.currentTarget.value))
                  }
                  value={percentage}
                />
              </InputGroup>
            </Field>
            <Field label="$ off - Provide a dollar amount" disabled={!!percentage}>
              <InputGroup startElement={<span>$</span>}>
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
            </Field>
          </Flex>
          <Heading my={5}>Or</Heading>
          <NativeSelect.Root>
            <NativeSelect.Field
              onChange={(e) => {
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
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
        <Button colorPalette="green" onClick={() => createCoupon()}>
          Submit
        </Button>
      </VStack>
      <VStack textAlign="center">
        <Heading size="md">Coupon List</Heading>

        {error ? (
          <></>
        ) : isLoading ? (
          <Spinner />
        ) : data ? (
          <Table.ScrollArea maxH={500} overflowY="auto">
            <Table.Root variant="outline" striped>
              <Table.Caption>
                {data.length
                  ? data.length + " coupons created"
                  : "No coupons available"}
              </Table.Caption>
              <Table.Header>
                <Table.Row>
                  {columns.map(({ name }) => (
                    <Table.ColumnHeader key={name}>{name}</Table.ColumnHeader>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data &&
                  data.map((couponItem, idx) => (
                    <Table.Row key={idx} display={!couponItem ? "none" : undefined}>
                      <Table.Cell>{idx + 1}</Table.Cell>
                      <Table.Cell>{couponItem.coupon.name || "null"}</Table.Cell>
                      <Table.Cell>{couponItem.promo_code}</Table.Cell>
                      <Table.Cell>
                        {couponItem.coupon.percent_off
                          ? `${couponItem.coupon.percent_off}%`
                          : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {couponItem.coupon.amount_off
                          ? `$${couponItem.coupon.amount_off}`
                          : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {couponItem.coupon.times_redeemed} /{" "}
                        {couponItem.coupon.max_redemptions}
                      </Table.Cell>
                      <Table.Cell>
                        {couponItem.expires_at! <= 1743119940
                          ? "No Expiration Date"
                          : new Date(
                              couponItem.expires_at! * 1000,
                            ).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{new Date(couponItem.created).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                        <Stack>
                          <Button
                            colorPalette="purple"
                            onClick={() => deletePromo(couponItem.promo_id)}
                            aria-label="Delete Promo Code"
                          >
                            <Trash2 />
                            Delete Promo Code
                          </Button>
                          <Button
                            colorPalette="red"
                            onClick={() => deleteCoupon(couponItem.coupon.id)}
                            aria-label="Delete Coupon"
                          >
                            <Trash2 />
                            Delete Coupon
                          </Button>
                        </Stack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        ) : (
          <></>
        )}
      </VStack>
    </Stack>
  );
};
