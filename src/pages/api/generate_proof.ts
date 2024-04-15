import { generateProof } from "@/lib/generateProof";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hit")
  const body = req?.body;
  console.log({body})
  if (body === undefined) {
    return res.status(403).json({ error: "Request has no body" });
  }

  const input0 = parseInt(body.input0);

  if (input0 === undefined || Number.isNaN(input0)) {
    console.log({input0})
    return res.status(403).json({ error: "Invalid inputs" });
  }
  const proof = await generateProof(input0);

  if (proof.proof === "") {
    return res.status(403).json({ error: "Proving failed" });
  }

  res.setHeader("Content-Type", "text/json");
  res.status(200).json(proof);
}
