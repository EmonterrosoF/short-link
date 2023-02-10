import { nanoid } from "nanoid";
import { z } from "zod";
import { ShortUrl } from "../../../models/shortUrl";

import { createTRPCRouter, publicProcedure } from "../trpc";

const shortUrlRouter = createTRPCRouter({
  createShortLink: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      try {
        const query = input.replace(/\s/g, "");

        const url = await ShortUrl.findOne({ originUrl: query });
        if (url) {
          return url;
          // res.json(url);
        } else {
          const urlId = nanoid(5);
          const urlShort = new ShortUrl({
            originUrl: query,
            shortUrl: urlId,
          });

          return await urlShort.save();
        }
      } catch (err) {
        console.log(err);
        throw new Error("internal error");
      }
    }),
});

export default shortUrlRouter;
