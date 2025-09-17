// pages/api/ehr/clinical.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "./utils/getToken";

const PRACTICE_ID = process.env.ATHENAHEALTH_PRACTICE_ID || "123456";
const API_VERSION = process.env.ATHENAHEALTH_API_VERSION || "v1";

function joinBase(path: string) {
  return `${process.env.ATHENAHEALTH_BASE_URL!.replace(/\/+$/,'')}/${API_VERSION}/${PRACTICE_ID}${path}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tokenData = await getToken();
    const access_token = tokenData.access_token;

    // path query may be 'patientid/vitals' or similar
    const rawPath = req.query.path;
    let path = "";
    if (!rawPath) {
      // default - try reading general chart endpoint (adjust to your integration needs)
      path = "/chart";
    } else if (Array.isArray(rawPath)) {
      path = `/${rawPath.join("/")}`;
    } else {
      path = `/${rawPath}`;
    }

    const athenaUrl = joinBase(path);

    // If write operation, ensure body exists
    if ((req.method === "POST" || req.method === "PUT") && !req.body) {
      return res.status(400).json({ error: "Body required for POST/PUT" });
    }

    const response = await fetch(athenaUrl, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: (req.method === "POST" || req.method === "PUT") ? JSON.stringify(req.body) : undefined,
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      data = { raw: text };
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data || text });
    }

    // Normalize into records
    const normalized = Array.isArray(data) ? { records: data } : (data.records ? { records: data.records } : { records: data });
    return res.status(200).json(normalized);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
