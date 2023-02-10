import mongoose from "mongoose";
import createModel from "./util/createModel";

interface IShortUrl {
  originUrl: string;
  shortUrl: string;
  clicks?: number;
}

const ShortUrlSchema = new mongoose.Schema<IShortUrl>(
  {
    originUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// export const ShortUrl =
//   mongoose.models.ShortUrl || mongoose.model("ShortUrl", ShortUrlSchema);
export const ShortUrl = createModel<IShortUrl>("ShortUrl", ShortUrlSchema);
