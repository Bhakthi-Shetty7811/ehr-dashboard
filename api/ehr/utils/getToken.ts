export async function getToken() {
  const response = await fetch(
    `${process.env.ATHENAHEALTH_BASE_URL}oauth2/v1/token`,
    {
      method: "POST",
      headers: {
        "Authorization":
          "Basic " +
          Buffer.from(
            `${process.env.ATHENAHEALTH_CLIENT_ID}:${process.env.ATHENAHEALTH_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch token: ${response.statusText}`);
  }

  return response.json();
}
