import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
	// console.log(request.nextUrl);
  let isAuthenticade = false;

  // Check if is invited user
  if(hasCookie("guest", {cookies})) {
    isAuthenticade = true;
  }


  // Check if is connected
  if(hasCookie("__secure-next-auth.session-token", {cookies})) {
    isAuthenticade = true;
  }



  // Check if is authenticated
  if(!isAuthenticade){
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

	return NextResponse.next();
}


export const config = {
	matcher: ["/"]
};