import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [],
  afterAuth(auth) {
    if (!auth.userId && !auth.isPublicRoute)
      return redirectToSignIn({
        returnBackUrl: process.env.NEXT_PUBLIC_BASE_URL + "/sign-success",
      });

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
