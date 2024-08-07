export const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(
      getPaypalId() + ":" + process.env.NEXT_PRIVATE_PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

export const getPaypalId = () => {
  if (process.env.NODE_ENV === "development")
    return process.env.NEXT_PUBLIC_SANDBOX_PAYPAL_ID!;
  return process.env.NEXT_PUBLIC_PAYPAL_ID!;
};
