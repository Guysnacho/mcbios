// export const generateAccessToken = async (simple?: boolean) => {
export const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(getPaypalId() + ":" + getPaypalSecret()).toString(
      "base64"
    );
    // if (simple) {
    //   return auth;
    // }

    const response = await fetch(`${getBaseUrl()}/v1/oauth2/token`, {
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

export const getPaypalSecret = () => {
  if (process.env.NODE_ENV === "development")
    return process.env.NEXT_PRIVATE_SANDBOX_SECRET!;
  return process.env.NEXT_PRIVATE_SECRET!;
};

export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";
};
