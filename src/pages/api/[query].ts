import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../db/db";
import { ShortUrl } from "../../models/shortUrl";

dbConnect().catch((err) => console.log(err));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.query;

    if (!query || query.length > 5)
      return res.status(404).json({ message: "query not found" });

    const shortUrl = await ShortUrl.findOne({
      shortUrl: query,
    });

    if (!shortUrl) return res.json({ url: null, validate: false });

    shortUrl.clicks = (shortUrl.clicks as number) + 1;

    await shortUrl.save();

    return res.json({ url: shortUrl.originUrl, validate: true });
  } catch (error) {
    console.log(error);
    return { message: "internal server error" };
  }
}
