import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "./utils/getToken";

const PRACTICE_ID = "123456";
const API_VERSION = "v1";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { access_token } = await getToken();

    // Allow subpath like ?path=patientid/vitals
    const { path = "" } = req.query;
    const baseUrl = `${process.env.ATHENAHEALTH_BASE_URL}${API_VERSION}/${PRACTICE_ID}/chart`;
    const athenaUrl = path ? `${baseUrl}/${path}` : baseUrl;

    const response = await fetch(athenaUrl, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body:
        req.method === "POST" || req.method === "PUT"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
