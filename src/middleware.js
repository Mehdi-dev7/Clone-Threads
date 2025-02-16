import { NextResponse } from "next/server";

export function middleware(request) {
	// console.log(request.nextUrl);
  let isAuthenticade = false;

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