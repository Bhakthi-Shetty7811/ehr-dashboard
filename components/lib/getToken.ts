// lib/getToken.ts
export async function getToken() {
  if (!process.env.ATHENAHEALTH_CLIENT_ID || !process.env.ATHENAHEALTH_CLIENT_SECRET || !process.env.ATHENAHEALTH_TOKEN_URL) {
    throw new Error("Missing Athena env variables");
  }

  const basic = Buffer.from(
    `${process.env.ATHENAHEALTH_CLIENT_ID}:${process.env.ATHENAHEALTH_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(process.env.ATHENAHEALTH_TOKEN_URL!, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Failed to parse token response: ${text}`);
  }

  if (!response.ok) {
    const err = json.error_description || JSON.stringify(json);
    throw new Error(`Failed to fetch token: ${err}`);
  }

  if (!json.access_token) {
    throw new Error("No access_token received from Athena");
  }

  return json;
}
