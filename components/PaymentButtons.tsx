import { Database } from "@/lib/utils/supabase/types";
import { useUserStore } from "@/providers/UserStateProvider";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  SharedSelection,
  Spinner,
} from "@nextui-org/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const tiers = [
  { key: "student", label: "Student - 10.00 USD" },
  { key: "postdoctorial", label: "Postdoctorial - 20.00 USD" },
  { key: "professional", label: "Professional - 50.00 USD" },
];

const PaymentButtons = (props: { client: SupabaseClient<Database> }) => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState<SharedSelection>(new Set([]));
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const store = useUserStore((state) => state);

  const persistStatus = async () => {
    setLoading(true);
    console.debug("Saving to datebase");
    const { error } = await props.client.from("member").update({
      user_id: store.id,
      dues_paid_at: new Date().toDateString(),
      role: value.currentKey as "student" | "postdoctorial" | "professional",
    });
    if (error) {
      setMessage(
        "We've recieved your dues but something went wrong with saving your status. Please contact us at mcbiossociety@gmail.com so we can fix this issue on our side :)"
      );
    } else {
      alert("Thank you for your contribution!");
      router.refresh();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (value) {
      // @ts-expect-error Don't feel like typing this
      store.setRole(value.anchorKey);
    }
  }, [value]);

  return (
    <div className="container my-5 space-y-5">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Select
            label="Select a Membership"
            className="max-w-xs"
            variant="bordered"
            selectedKeys={value}
            onSelectionChange={setValue}
          >
            {tiers.map((tier) => (
              <SelectItem key={tier.key}>{tier.label}</SelectItem>
            ))}
          </Select>
          {message ? (
            <Card>
              <CardBody>
                <p>{message}</p>
              </CardBody>
            </Card>
          ) : undefined}
          <div style={{ width: "75%", marginInline: "auto" }}>
            <PayPalButtons
              disabled={value.size !== 1}
              style={{
                shape: "pill",
                height: 55,
              }}
              createOrder={async () => {
                console.log("store.selectedRole");
                console.log(store.selectedRole);
                try {
                  const response = await fetch("/api/orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                      role: store.selectedRole as string,
                    }),
                  });
                  const orderData = await response.json();
                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData);
                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(`Could not initiate PayPal Checkout...${error}`);
                  throw error;
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const response = await fetch(`/api/orders/${data.orderID}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  const orderData = await response.json();
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show confirmation or thank you message

                  const errorDetail = orderData?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];
                    // todo remove log and message
                    setMessage(
                      `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                    );
                    console.log(
                      "Capture result",
                      orderData,
                      JSON.stringify(orderData, null, 2)
                    );
                    await persistStatus();
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(
                    `Sorry, your transaction could not be processed...${error}`
                  );
                }
              }}
              onError={(err) => {
                setMessage(
                  "Something went wrong while submitting your payment. Please try again later."
                );
                // console.error(err);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentButtons;
