import { generateAccessToken, getBaseUrl } from "@/lib/utils/paypal";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") res.status(404).json({ message: "Not Found" });
  const role = req.body.role;
  if (
    !role ||
    !role.includes("student") ||
    !role.includes("postdoctorial") ||
    !role.includes("professional")
  )
    res.status(403);

  const accessToken = await generateAccessToken();

  const url = `${getBaseUrl()}/v2/checkout/orders`;
  let payload = {};
  switch (role) {
    case "student":
      payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "10.00",
            },
          },
        ],
      };
      break;
    case "postdoctorial":
      payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "20.00",
            },
          },
        ],
      };
      break;
    case "professional":
      payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "50.00",
            },
          },
        ],
      };
      break;

    default:
      res.status(404);
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  try {
    res.status(200).json(await response.json());
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
