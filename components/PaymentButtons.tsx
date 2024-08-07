import {
  Card,
  CardBody,
  Select,
  SelectItem,
  SharedSelection,
} from "@nextui-org/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export const tiers = [
  { key: "student", label: "Student", amount: 10 },
  { key: "postdoc", label: "Postdoctorial", amount: 20 },
  { key: "professional", label: "Professional", amount: 50 },
];

const PaymentButtons = () => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState<SharedSelection>(new Set([]));

  return (
    <div className="container my-5 space-y-5">
      <Select
        label="Select a Membership"
        className="max-w-xs"
        variant="bordered"
        selectedKeys={value}
        onSelectionChange={setValue}
      >
        {tiers.map((tier) => (
          <SelectItem key={tier.key}>
            {tier.label} - {tier.amount}.00 USD
          </SelectItem>
        ))}
      </Select>
      {message ? (
        <Card>
          <CardBody>
            <p>{message}</p>
          </CardBody>
        </Card>
      ) : undefined}
      <div className="flex justify-center">
        <PayPalButtons
          disabled={value.size !== 1}
          style={{
            shape: "pill",
            height: 55,
          }}
          createOrder={async () => {
            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  cart: [
                    {
                      id: value.currentKey,
                      quantity: 1,
                    },
                  ],
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
            }
          }}
        />
      </div>
    </div>
  );
};

export default PaymentButtons;
