import { type NextRequest, NextResponse } from "next/server";

interface data {
  validate: boolean;
  url: string;
}

export async function middleware(req: NextRequest) {
  try {
    const slug = req.nextUrl.pathname.split("/").pop();

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
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
