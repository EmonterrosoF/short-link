import { type NextRequest, NextResponse } from "next/server";

interface data {
  validate: boolean;
  url: string;
}

export async function middleware(req: NextRequest) {
  console.log("request url", req.url);
  if (req.method !== "GET")
    return NextResponse.json(
      { message: "method not allowed" },
      { status: 505 }
    );
  try {
    const slug = req.nextUrl.pathname.split("/").pop();

    if (!slug) NextResponse.redirect(req.nextUrl.origin);

    const resp = await fetch(`${req.nextUrl.origin}/api/${slug as string}`);

    const data = (await resp.json()) as data;

    if (data.validate) return NextResponse.redirect(data.url);

    return NextResponse.redirect(req.nextUrl.origin);
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(req.nextUrl.origin);
  }
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
