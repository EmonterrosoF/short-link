import { type NextRequest, NextResponse } from "next/server";

interface data {
  validate: boolean;
  url: string;
}

export async function middleware(req: NextRequest) {
  console.log("request url", req.url);
  if (req.method !== "GET") return NextResponse.next();
  try {
    const slug = req.nextUrl.pathname.split("/").pop();
    if (!slug) return NextResponse.next();
    if (slug.length > 5) NextResponse.next();

    const resp = await fetch(`${req.nextUrl.origin}/api/${slug}`);

    const data = (await resp.json()) as data;

    if (data.validate) return NextResponse.redirect(data.url);

    return NextResponse.redirect(req.nextUrl.origin);
  } catch (error) {
    console.log(error);
    return NextResponse.next();
    // return NextResponse.redirect(req.nextUrl.origin);
  }
}

export const config = {
  matcher: ["/((?!api|_next/|favicon.ico).*)"],
};
