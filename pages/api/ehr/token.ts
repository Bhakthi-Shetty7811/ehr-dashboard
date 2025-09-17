import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "@/components/lib/getToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getToken();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to get token" });
  }
}
