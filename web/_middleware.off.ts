import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
function generateId(){ return "mk_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
export function middleware(req: NextRequest){
  const res = NextResponse.next();
  const has = req.cookies.get("mk_uid");
  if(!has){ res.cookies.set({ name: "mk_uid", value: generateId(), path: "/", httpOnly: false, sameSite: "lax", maxAge: 60*60*24*365 }); }
  return res;
}
export const config = { matcher: "/:path*" };
