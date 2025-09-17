// pages/api/ehr/appointments.ts
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

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const athenaPath = id ? `/appointments/${id}` : `/appointments`;
    const athenaUrl = joinBase(athenaPath);

    // Payload validation for POST/PUT
    if ((req.method === "POST" || req.method === "PUT")) {
      if (!req.body || !req.body.date || !req.body.patientId) {
        return res.status(400).json({ error: "appointment requires date and patientId" });
      }
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

    const normalized = Array.isArray(data) ? { appointments: data } : (data.appointments ? { appointments: data.appointments } : { appointments: data });
    return res.status(200).json(normalized);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
}

